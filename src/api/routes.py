"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Game, Favorite_game, Friend_request, Friendship, Subscription, Session, Session_member, Platform
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

@api.route('/games_all', methods=['GET'])
def get_all_games():
    try:
        query_games = db.session.query(Game).all()
        serialize_games = [result.serialize() for result in query_games]
        return jsonify(serialize_games), 200
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


@api.route('/filter_user', methods=['POST'])
def search_user():
    try:
        data = request.get_json()

        username = data.get("username")
        type_game = data.get("type_game")
        platform = data.get("platform")
        region = data.get("region")
        schedule = data.get("schedule")

        query = db.session.query(User)

       
        if username:
            query = query.filter(User.username.ilike(f'%{username}%'))


        if type_game:
            query = query.filter(User.type_game.contains([type_game]))


        if platform:
            query = query.filter(User.platform.contains([platform]))


        if region:
            query = query.filter(User.region == region)


        if schedule:
            query = query.filter(User.schedule == schedule)

        users = query.all()
        serialize_users = [user.serialize() for user in users]

        return jsonify(serialize_users), 200

    except Exception as err:
        return jsonify({"error": "There was an unexpected error", "msg": str(err)}), 500
    

@api.route('/profile_edit/<int:id_user>', methods=['PUT'])
def update_profile_edit(id_user):
    only_allowed = ["first_name", "last_name", "discord_id", "steam_id", "description", "platform", "profile_img_url", "schedule", "region"]
    data = request.get_json()
    try:
        query_user = db.session.query(User).filter_by(id=id_user).first()
        if not query_user:
            return jsonify({"msg": "No se encontró el usuario"}), 404
        for item in only_allowed:
            if item in data:
                value = data[item]
                if item == "platform":
                    if isinstance(value, str):
                        value = [platform.strip() for platform in value.split(',')]
                    elif not isinstance(value, list):
                        return jsonify({"msg": "El campo 'platform' debe ser una cadena o una lista"}), 400
                    valid_platforms = [p.value for p in Platform]
                    if not all(platform in valid_platforms for platform in value):
                        return jsonify({"msg": f"Plataformas no válidas: {', '.join(value)}"}), 400
                    value = [Platform(platform) for platform in value]
                
                
                if item == "schedule":
                    pass
                
                if item == "region":
                
                    valid_regions = ["NA", "SA"]
                    if value not in valid_regions:
                        return jsonify({"msg": f"Región no válida: {value}"}), 400
                
                setattr(query_user, item, value)
        
        db.session.commit()
        return jsonify({"msg": "Se actualizó la información satisfactoriamente"}), 200
    except Exception as err:
        db.session.rollback()
        return jsonify({"error": "Ocurrió un error inesperado", "msg": str(err)}), 500

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
        query_game = db.session.query(Game).filter_by(id = data["id_game"]).first()
        serialize_game = query_game.serialize()
        session_game_name = serialize_game["name"]
        query_user = db.session.query(User).filter_by(id = data["id_host"]).first()
        serialize_user = query_user.serialize()
        session_username= serialize_user["username"]
        session_profile_img = serialize_user["profile_img_url"]                    
        new_session = Session(game_id = data["id_game"], game_name=session_game_name, host_id = data["id_host"], host_username = session_username, host_profile_image = session_profile_img, start_date = data["start_date"], duration = data["duration"], language = data["language"], session_type = data["session_type"],region = data["region"], background_img = data["background_img"],description=data["description"], capacity = data["capacity"])    
        db.session.add(new_session)
        db.session.commit()
        return jsonify({"msg":"sesion creada con exito", "id_sesion": new_session.id}),200      

    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500

@api.route('/sessions/<int:id_session>', methods=['GET'])
def get_specific_session(id_session):
    try:

        query_session = db.session.query(Session, Game.name, User.username, User.profile_img_url)\
            .join(Game, Session.game_id == Game.id)\
            .join(User, Session.host_id == User.id)\
            .filter(Session.id == id_session)\
            .first_or_404()

        session, game_name, host_username, profile_img_url = query_session
        
        session_data = session.serialize()  
        session_data['game_name'] = game_name  
        session_data['host_username'] = host_username 
        session_data['host_profile_imagen'] = profile_img_url 

        total_members_query = db.session.query(Session_member).filter_by(session_id=id_session).count()
        session_data['total_members'] = total_members_query
        
       
        if total_members_query >= session.capacity:
            session_data['is_full'] = True
        else:
            session_data['is_full'] = False

        return jsonify(session_data), 200
        
    except Exception as err:
        return jsonify({"error": "There was an unexpected error", "msg": str(err)}), 500

    
@api.route('/sessions_user/<int:id_user>',methods=['GET'])
def get_user_sessions(id_user):
    member_sessions = []  
    try:
        query_sessions = db.session.query(Session).filter_by(host_id = id_user).all()
        query_session_member = db.session.query(Session_member).filter_by(participant_id = id_user).all()
        if not query_sessions and not query_session_member:
            return jsonify({"msg","No se encotraron sesiones como host o participante"}),404
        else:
            hosted_sessions = [item.serialize() for item in query_sessions]
            for item in query_session_member:
                member_session_id = item.session_id
                query_member_session = db.session.query(Session).filter_by(id = member_session_id).first()
                if query_member_session:
                    serialize_member_session = query_member_session.serialize()
                    member_sessions.append(serialize_member_session)

        return jsonify({"hosted":hosted_sessions,"member":member_sessions}),200  
           
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500


@api.route('/sessions', methods=['GET'])
def get_all_sessions():
    try:
        sessions = db.session.query(Session, Game.name, User.username)\
            .join(Game, Session.game_id == Game.id)\
            .join(User, Session.host_id == User.id)\
            .all()

        session_list = []
        for session, game_name, host_username in sessions:
            session_data = session.serialize()  
            session_data['game_name'] = game_name  
            session_data['host_username'] = host_username 


            total_members_query = db.session.query(Session_member).filter_by(session_id=session.id).count()
            session_data['total_members'] = total_members_query
            

            session_data['is_full'] = total_members_query >= session.capacity

            session_list.append(session_data)

        return jsonify(session_list), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

        
    
    
@api.route('/sessions_remove', methods=['DELETE'])
def remove_session():
    id_session = request.args.get('id_session')    
    query_session = db.session.query(Session).filter_by(id = id_session).first()
    try:
        if query_session is None:
            return jsonify({"msg":"No existe la session"}),404
        else:
            db.session.delete(query_session)
            db.session.commit()
            return jsonify({"msg":"La operacion fue exitosa"}),200
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500    

@api.route('/sessions_join', methods=['POST'])
def join_session():
    data = request.get_json()
    #required = {"id_user","id_session"}
    try:
        query_user = db.session.query(User).filter_by(id = data["id_user"]).first_or_404()
        query_session = db.session.query(Session).filter_by(id = data["id_session"]).first_or_404()
        query_participant = db.session.query(Session_member).filter_by(session_id = data["id_session"], participant_id = data["id_user"]).first()
        if query_participant is not None:
            return jsonify({"msg":"this user is already a member of this session"}),400

        else:
            new_member = Session_member(session_id = data["id_session"], participant_id = data["id_user"])
            db.session.add(new_member)
            db.session.commit()
            return jsonify({"msg":"El miembro fue agregado correctamente"}),200

    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500

@api.route('/sessions_members/<int:id_session>', methods=['GET'])
def get_session_members(id_session):
    members_data= []
    not_members = []
    query_session = db.session.query(Session_member).filter_by(session_id = id_session).all()    
    try:
        if not query_session :
            return jsonify({"msg":"No se encontraron miembros"}),404
        else: 
            for item in query_session:
                member_id = item.participant_id
                query_member = db.session.query(User).filter_by(id = member_id).first()
                if query_member is not None:
                    serialize_member = query_member.serialize()
                    members_data.append(serialize_member)
                else:
                    not_members.append(member_id)  
            if not_members:
                return jsonify({"msg":"some members are not registered on the db","members_id":not_members}),404  

        return jsonify({"members": members_data, "total_members": len(members_data)}),200
        
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500

""" FRIENDSHIP ENDPOINT """
@api.route('/friends_request',methods=['POST'])
def send_friend_invite():
    required = {"user_send_invite","user_receive_invite"}
    data = request.get_json()
    try:
        query_request = db.session.query(Friend_request).filter_by(user_send_invite = data["user_send_invite"], user_receive_invite = data["user_receive_invite"]).first()
        if query_request is not None:
            return jsonify({"msg":"Este pedido de amistad ya existe"}),400
        for item in required:
            if item not in data or not data[item]:
                return jsonify({"msg":"Faltan datos o existen valores vacios"}),400
            
        query_send_user = db.session.query(User).filter_by(id = data["user_send_invite"]).first_or_404()
        query_receive_user = db.session.query(User).filter_by(id = data["user_receive_invite"]).first_or_404()
        serialize_send = query_send_user.serialize()
        get_send_username = serialize_send["username"]
        get_send_profile_img = serialize_send["profile_img_url"]
        serialize_receive = query_receive_user.serialize()
        get_receive_username = serialize_receive["username"]
        get_receive_profile_img = serialize_receive["profile_img_url"]   
        new_request = Friend_request(user_send_invite = data["user_send_invite"], user_receive_invite = data["user_receive_invite"], send_username = get_send_username, receive_username = get_receive_username, send_profile_image = get_send_profile_img, receive_profile_image = get_receive_profile_img)
        db.session.add(new_request)
        db.session.commit()
        return jsonify({"msg":"invitacion fue enviado con exito"}),200
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500


@api.route('/friends_request/<int:id_user>',methods=['GET'])
def get_friend_request(id_user):
    try:
        query_request = db.session.query(Friend_request).filter_by(user_receive_invite = id_user).all()
        if not query_request:
            return jsonify({"msg":"No existen peticiones de amistad"}),404 
        else: 
            serialize_request = [item.serialize() for item in query_request]
            return jsonify(serialize_request),200
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500

@api.route('/friends_request_remove',methods=['DELETE'])
def remove_friend_request():
    req_send = request.args.get("id_send")
    req_receive = request.args.get("id_receive")
    try:
        if req_send is None or req_receive is None:
            return jsonify({"msg":"Los valores no pueden ser vacios"})
        else:
            query_req = db.session.query(Friend_request).filter_by(user_send_invite = req_send, user_receive_invite = req_receive).first()
            if query_req:
                db.session.delete(query_req)
                db.session.commit()
                return jsonify({"msg":"Peticion de amistdas eliminada con exito"}),200
            else:
                return jsonify({"msg":"No se encontro ninguna peticion de amistad"}),404

    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500



@api.route('/friends_accept',methods=['POST'])
def new_friend():
    required = {"user_id_first","user_id_second"} # FIRST = QUIEN QUIERE SER TU AMIGO , SECOND = TU ID
    data = request.get_json()
    try:
        for item in required:
            if item not in data or not data[item]:
                return jsonify({"msg":"Faltan datos o existen valores vacios"}),400
                       
        query_friendship = db.session.query(Friendship).filter_by(user_id_first = data["user_id_first"], user_id_second = data["user_id_second"]).first()
        query_friendship_reverse = db.session.query(Friendship).filter_by(user_id_first = data["user_id_second"], user_id_second =  data["user_id_first"]).first()

        if query_friendship:
            return jsonify({"msg":"Usuarios ya son amigos"}),400
        if query_friendship_reverse:
            return jsonify({"msg":"Usuarios ya son amigos"}),400
           
        query_first_user = db.session.query(User).filter_by(id = data["user_id_first"]).first_or_404()
        query_second_user = db.session.query(User).filter_by(id = data["user_id_second"]).first_or_404()
        serialize_first = query_first_user.serialize()
        get_first_username = serialize_first["username"]
        get_first_profile_img = serialize_first["profile_img_url"]
        serialize_second = query_second_user.serialize()
        get_second_username = serialize_second["username"]
        get_second_profile_img = serialize_second["profile_img_url"]
        new_friendship = Friendship(user_id_first = data["user_id_first"], user_id_second = data["user_id_second"], first_username = get_first_username, second_username = get_second_username, first_profile_image = get_first_profile_img, second_profile_image = get_second_profile_img)
        db.session.add(new_friendship)                
        delete_request = db.session.query(Friend_request).filter_by(user_send_invite = data["user_id_first"],user_receive_invite = data["user_id_second"]).first()
        db.session.delete(delete_request)
        db.session.commit()
        return jsonify({"msg":"La amistad se registro con exito"}),200
    
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500    
    

@api.route('/friends_remove', methods=['DELETE'])
def remove_friend():
    id_first = request.args.get("id_first")
    id_second = request.args.get("id_second")
    try:
        if id_first is None or id_second is None:
            return jsonify({"msg","Los valores no pueden ser vacios"}),400
        
        query_friendship = db.session.query(Friendship).filter_by(user_id_first = id_first, user_id_second = id_second).first()
        query_friendship_reverse = db.session.query(Friendship).filter_by(user_id_first = id_second, user_id_second = id_first).first()

        if query_friendship:
            db.session.delete(query_friendship)
        if query_friendship_reverse:
            db.session.delete(query_friendship_reverse)
        db.session.commit()        
        return jsonify({"msg":"Se elimino el amigo con exito"}),200
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500

@api.route('/friends/<int:id_user>',methods=['GET'])
def get_user_friends(id_user):    
    try:
        query_request = db.session.query(Friendship).filter_by(user_id_second = id_user).all()
        if not query_request:
            return jsonify({"msg":"No existen amistades"}),404 
        else: 
            serialize_request = [item.serialize() for item in query_request]
            return jsonify(serialize_request),200
    except Exception as err:
        return jsonify({"error":"There was an unexpected error","msg":str(err)}),500


    



