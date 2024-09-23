"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Game, Favorite_game, Friend_request, Friendship, Subscription, Session, Session_member
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy.sql import func
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from datetime import datetime
import pytz


api = Blueprint('api', __name__)

bcrypt = Bcrypt()
jwt = JWTManager()

# Allow CORS requests to this API
CORS(api)


""" GAME ENDPOINTS """

@api.route('/games_recommended/<int:number_games>', methods=['GET'])
def get_random_games(number_games):

    try:
        rows_count = db.session.query(func.count(Game.id)).scalar()
        if number_games > rows_count:
            return jsonify({"msg":"Your number of games requested is above the total number of games in our BD"}),400
        else:
            query_games = db.session.query(Game).order_by(func.random()).limit(number_games).all()
            serialize_games = [result.serialize() for result in query_games]        
            return jsonify(serialize_games),200       

    except Exception as err:   
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500

@api.route('/games/<int:id_game>', methods=['GET'])
def get_specific_game(id_game):

    try:
        query_game = db.session.query(Game).filter_by(id = id_game).first()
        if query_game is None:
            return jsonify({"msg":"There is no with that id"}),400    
        else:
            serialize_game = query_game.serialize()
            return jsonify(serialize_game),200

    except Exception as err:   
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500 

@api.route('/search_game', methods=['GET'])
def get_game_by_name():    
    try:
        game_name = request.args.get("name")
        if game_name is None:
            return jsonify({"msg":"No game name was provided"}),400
        else:
            query_game = db.session.query(Game).filter(Game.name.ilike(f'%{game_name}%')).limit(4).all()
            serialize_game = [game.serialize() for game in query_game]
            return jsonify(serialize_game),200
    
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500 

@api.route('/favorites/<int:id_user>',methods=["GET"])
def get_user_favorites(id_user):
    user_fav_games =[]
    try:
        query_favs = db.session.query(Favorite_game).filter_by(user_id = id_user).all()
        if query_favs is None:
            return jsonify({"msg":"No favorites games yet"}),404
        else:
            serialize_favs = [fav.serialize() for fav in query_favs]
            user_favs = [fav["game_id"] for fav in serialize_favs]    
            for fav_id in user_favs:
                fav_games = db.session.query(Game).filter_by(id= fav_id).first()
                fav_games_serialize = fav_games.serialize()
                user_fav_games.append(fav_games_serialize)
            return jsonify({"user_id":id_user,"user_games":user_fav_games}),200
                
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500 

@api.route('/favorites', methods=["POST"])
def post_fav_game():
    data = request.get_json()
    required = {"id_user","fav_ids"}
    try:
        for item in required:
            if item not in data or not data[item]:
                return jsonify({"msg":"Some required fields are missing or empty"}),400
            
        id_user = data["id_user"]
        fav_ids = data["fav_ids"]
        no_dupe_favs = []

        if not isinstance(id_user,int):
            return jsonify({"msg": " id_user debe ser de tipo INT(entero)"}), 400
        if not isinstance(fav_ids,list):
            return jsonify({"msg": "fav_ids debe ser de tipo List(array)"}), 400
        if not all(isinstance(id_game, int) for id_game in fav_ids):
            return jsonify({"msg": "fav_ids debe ser una lista(array) que contega solo INT(enteros)"}), 400
        
        for id_game in fav_ids:
            query_fav = db.session.query(Favorite_game).filter_by(user_id = id_user, game_id = id_game).first()            
            if query_fav is None:
                no_dupe_favs.append(id_game)

        if no_dupe_favs:
            for id_game in no_dupe_favs:
                new_fav_game = Favorite_game(user_id = id_user, game_id = id_game)
                db.session.add(new_fav_game)
            db.session.commit()
            return jsonify({"msg": "Se agregaron juegos favorios de forma exitosa"}), 201    
        else:
            return jsonify({"msg": "Todos los juegos ya se encuentra como favoritos"}), 400
        
    except Exception as err:
        db.session.rollback()
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500 

@api.route('/favorites_remove', methods=['DELETE'])
def remove_fav():
    id_user = request.args.get('id')
    id_game = request.args.get('id_game')
    query_fav = db.session.query(Favorite_game).filter_by(user_id = id_user, game_id= id_game).first()
    try:
        if query_fav is None:
            return jsonify({"msg":"No existe el juego en favoritos"})
        else:
            db.session.delete(query_fav)
            db.session.commit()
            return jsonify({"msg":"La operacion fue exitosa"})
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500    

@api.route('/filter_game', methods=['POST'])
def search_game():
    try:
        data = request.get_json()

        game_name = data.get("name")
        platform = data.get("platform")
        type_game = data.get("type_game")

        query = db.session.query(Game)

        if game_name:
            query = query.filter(Game.name.ilike(f'%{game_name}%'))

        if platform:
            query = query.filter(Game.platform.contains([platform])) 

        if type_game:
            query = query.filter(Game.type_game.contains([type_game]))  

        games = query.all()
        serialize_game = [game.serialize() for game in games]

        return jsonify(serialize_game), 200

    except Exception as err:
        return jsonify({"error": "There was an unexpected error", "msg": str(err)}), 500
    

@api.route('/favorites/users/<int:game_id>', methods=["GET"])
def users_of_favorite_game(game_id):
    users = []
    try:
        
        query_favs = db.session.query(Favorite_game).filter_by(game_id=game_id).all()


        if query_favs is None or len(query_favs) == 0:
            return jsonify({"msg": "No existen usuarios con este juego como favorito"}), 404
        

        user_ids = [fav.user_id for fav in query_favs]
        

        for user_id in user_ids:
            user = db.session.query(User).filter_by(id=user_id).first()
            if user:
                users.append(user.serialize())

        return jsonify({"game_id": game_id, "users": users}), 200
    
    except Exception as err:
        return jsonify({"error": "There was an unexpected error", "msg": str(err)}), 500


""" USER ENDPOINT """

@api.route("/users",methods=["POST"])

def post_new_user():
    data = request.get_json()
    """ required = {"username","email","password","first_name","last_name","age","discord_id","steam_id","schedule","description","region","gender","platform","type_game"} """
    required = {"username","email","password","first_name","last_name","age","gender","platform","type_game"}
    query_user = db.session.query(User).filter_by(username = data['username']).first()
    try:        
        for item in required:
            if item not in data or not data[item]:
                return jsonify({"msg":"Some required fields are missing or empty"}),400

        if query_user is not None:
            return jsonify({"msg":"User already exists"}),400

        else:            
            hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            """ new_user = User(username = data["username"], email = data["email"],password = hashed_password, first_name = data["first_name"],last_name = data["last_name"], age = data["age"], discord_id = data["discord_id"], steam_id = data["steam_id"],schedule = data["schedule"], description = data["description"], region = data["region"], gender = data["gender"],platform = data["platform"], type_game = data["type_game"], user_type ="NORMAL") """
            new_user = User(username = data["username"], email = data["email"],password = hashed_password, first_name = data["first_name"],last_name = data["last_name"], age = data["age"],   gender = data["gender"],platform = data["platform"], type_game = data["type_game"], user_type ="NORMAL")
            db.session.add(new_user)   
            db.session.commit()
            new_user_id = db.session.query(User).filter_by(username = data["username"]).first()
            serialize_new_user_id = new_user_id.serialize_id()
            return jsonify({"msg":"User registered successfully","id_user":serialize_new_user_id}),200        
       
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500 

@api.route("/search_users", methods=["GET"])
def search_user_name():
    try:
        user_name = request.args.get("name")
        if user_name is None:
            return jsonify({"msg:":"No user name was provided"}),400
        else:
            query_name = db.session.query(User).filter(User.username.ilike(f'%{user_name}%')).limit(4).all()
            serialize_users = [name.serialize() for name in query_name]
            return jsonify(serialize_users),200  
        
        
    except Exception as err:
        return jsonify({"error":"there was an unexpected error","msg":str(err)}),500
  


@api.route('/profile/<int:user_id>', methods=['GET'])
def get_profile_user(user_id):
    try:
        user = db.session.query(User).filter_by(id=user_id).one_or_none()
        if user is None:
            return jsonify({"error": "User not found"}), 404
        user_dict = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'discord_id': user.discord_id or "N/A",
            'steam_id': user.steam_id or "N/A",
            'description': user.description or "No description available",
            'profile_img_url': user.profile_img_url or "No image available",
            'platform': [platform.value for platform in user.platform] if user.platform else []
        }
        return jsonify(user_dict), 200
    except Exception as err:
        return jsonify({"error": "There was an unexpected error", "msg": str(err)}), 500


@api.route('/update_user/<int:id_user>', methods=['PUT'])
def update_user_info(id_user):
    only_allowed = ["email","first_name","last_name","age","discord_id","steam_id","schedule","description","region","gender","platform","type_games","profile_img_url"]
    data = request.get_json()

    try:
        query_user = db.session.query(User).filter_by(id=id_user).first()        
        if query_user is None:
            return jsonify({"msg":"No se encontro el usuario"})        
        for item in only_allowed:
            if item in data and data[item]:
                setattr(query_user,item,data[item])
        db.session.commit()        
        return jsonify({"msg":"se actualizo la informacion satisfactoriamente"})
    
    except Exception as err:
        db.session.rollback()
        return jsonify({"error": "There was an unexpected error", "msg": str(err)}), 500

    

""" LOGIN AND AUTENTICATION """

@api.route('/login', methods=['POST'])
def login():
    user = request.json.get("username", None)
    passw = request.json.get("password", None)
    print(f"User: {user}, Password: {passw}")
    if user is None or passw is None:
            return jsonify({"msg":"Username and password are required"}),400
    try:
        query_user = db.session.query(User).filter_by(username=user).one()
        user_db_passw = query_user.password
        validate = bcrypt.check_password_hash(user_db_passw,passw)
        if validate:
            user_id = query_user.id
            usr_type = query_user.user_type.value
            print(usr_type)
            custom_claims = {"user_type": usr_type}
            access_token = create_access_token(identity = user_id, additional_claims=custom_claims)
            return jsonify({"access_token":access_token,"username":query_user.username,"user_type":query_user.user_type.value ,  "user_id": query_user.id }),200
        else:
            return jsonify({"error":"Incorrect password"}),400
    except Exception as err:
        return jsonify({"error":"there was an unexpected error","msg":str(err)}),500
    
  
@api.route('/validate',methods=['GET'])
@jwt_required()
def validate_access():
    try:
        current_id = get_jwt_identity()
        if current_id:
            return jsonify({"validate":True}),200
        else:
            return jsonify({"validate":False}),400
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500





""" SESIONES ENDPOINT """

@api.route('/sessions',methods=['POST'])
def post_new_session():
    data = request.get_json()
    required = {"id_game","id_host","start_date","duration","language","session_type","region","background_img","description","capacity"}
    try:
        for item in required:
            if item not in data or not data[item]:
                return jsonify({"msg":"Algunos campos estan vacios o no se han enviado"}),400
            
        check_time = datetime.fromisoformat(data["start_date"])   #ISO 8601 
        if check_time.tzinfo is None:
            check_time = check_time.replace(tzinfo=pytz.utc) 
        else:
            check_time = check_time.astimezone(pytz.utc)    
        new_session = Session(game_id = data["id_game"], host_id = data["id_host"], start_date = data["start_date"], duration = data["duration"], language = data["language"], session_type = data["session_type"],region = data["region"], background_img = data["background_img"],description=data["description"], capacity = data["capacity"])    
        db.session.add(new_session)
        db.session.commit()
        return jsonify({"msg":"sesion creada con exito"}),200      

    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500

@api.route('/sessions/<int:id_session>',methods=['GET'])
def get_specific_session(id_session):
    try:
        query_session = db.session.query(Session).filter_by(id=id_session).first_or_404()
        serialize_session = query_session.serialize()
        return jsonify(serialize_session),200

    except Exception as err:
         return jsonify({"error":"There was an unexpected error","msg":str(err)}),500
    
@api.route('/sessions_user/<int:id_user>',methods=['GET'])
def get_user_sessions(id_user):
    try:
        query_sessions = db.session.query(Session).filter_by(host_id = id_user).all()
        if query_sessions is None:
            return jsonify({"msg","No se encontraron sesiones"}),404
        else:
            serialize_session = [sess.serialize() for sess in query_sessions]
            return jsonify(serialize_session),200
        
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500


    

    

