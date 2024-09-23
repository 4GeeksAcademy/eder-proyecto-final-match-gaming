from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
import enum
from sqlalchemy import Enum
from sqlalchemy import DateTime
from datetime import datetime, timezone

db = SQLAlchemy()

class UserType(enum.Enum):
    NORMAL = 'normal'
    PREMIUM = 'premium'

class TypeGame(enum.Enum):
    ACTION = 'action'
    ADVENTURE = 'adventure'
    RPG = 'rpg'
    STRATEGY = 'strategy'
    SPORTS = 'sports'
    SHOOTER = 'shooter'

class Platform(enum.Enum):
    STEAM = 'steam'
    PLAY = 'play station'
    XBOX = 'xbox'    
    SWITCH = 'nintendo switch'


class Schedule(enum.Enum):
    ANYTIME = 'anytime'
    MORNING = 'Morning'
    AFTERNOON = 'afternoon'
    EVENING = 'evening'

class Status(enum.Enum):
    ACTIVE = 'active'
    ENDED = 'ended'    

class Region(enum.Enum):
    NA = 'north america'
    SA = 'south america'
    
class Gender(enum.Enum):
    M = 'male'
    F = 'female'

class Duration(enum.Enum):
    UNK = 'unkwnon'
    ONE = 'one hour'
    TWO = 'two hours'
    THREE = 'three hours'

class Language(enum.Enum):
    ENGLISH = 'en'
    SPANISH = 'es'
    PORTUGUESE = 'pt'  

class SessionType(enum.Enum):
    PUBLIC = 'public'
    PRIVATE = 'private'      

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_type = db.Column(Enum(UserType),unique=False,nullable=False)
    username = db.Column(db.String(80),unique=True,nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(80),unique=False,nullable=False)
    last_name = db.Column(db.String(80),unique=False,nullable=False)
    age = db.Column(db.String(80),unique=False,nullable=False)
    discord_id = db.Column(db.String(80),unique=False,nullable=True)
    steam_id = db.Column(db.String(80),unique=False,nullable=True)
    schedule = db.Column(Enum(Schedule),nullable=True)
    description = db.Column(db.String(200), unique=False, nullable=True)
    region = db.Column(Enum(Region),unique=False,nullable=True)
    gender = db.Column(Enum(Gender),unique=False,nullable=False)
    platform = db.Column(ARRAY(Enum(Platform)),unique=False,nullable=False)
    type_game = db.Column(ARRAY(Enum(TypeGame)),unique=False,nullable=False)
    profile_img_url = db.Column(db.String(200),unique=False,nullable=True)
    created_at = db.Column(DateTime,nullable=False,default=datetime.now(timezone.utc))
    updated_at = db.Column(DateTime,nullable=False,default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    favorite_game = db.relationship('Favorite_game', backref='user',lazy=True)
    session = db.relationship('Session',backref='user',lazy=True)    
    subscription = db.relationship('Subscription',backref='user',lazy=True)
    session_member = db.relationship('Session_member',backref='user',lazy=True)
    friend_request_sent = db.relationship('Friend_request',foreign_keys='Friend_request.user_send_invite',backref='send',lazy=True)
    friend_request_received = db.relationship('Friend_request',foreign_keys='Friend_request.user_receive_invite',backref='receive',lazy=True)    
    friendship_first = db.relationship('Friendship',foreign_keys='Friendship.user_id_first',backref='first',lazy=True)
    friendship_second = db.relationship('Friendship',foreign_keys='Friendship.user_id_second',backref='second',lazy=True)


    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_type":self.user_type.value,
            "username":self.username,
            "email": self.email,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "age":self.age,
            "discord_id":self.discord_id if self.discord_id else None,
            "steam_id":self.steam_id if self.steam_id else None,
            "schedule":self.schedule.value if self.schedule else None,
            "description":self.description if self.description else None,
            "region":self.region.value if self.region else None,
            "gender":self.gender.value,
            "platform":[platform.value for platform in self.platform],
            "type_game":[type_game.value for type_game in self.type_game],
            "profile_img_url":self.profile_img_url           
            # do not serialize the password, its a security breach
        }
    def serialize_id(self):
        return{
            "id":self.id
        }
    

class Game(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(200),unique=False,nullable=False)
    platform = db.Column(ARRAY(Enum(Platform)),unique=False,nullable=False)
    released = db.Column(DateTime(timezone=True),unique=False,nullable=False)
    background_image = db.Column(db.String(200),unique=False,nullable=False)
    type_game = db.Column(ARRAY(Enum(TypeGame)),unique=False,nullable=False)
    rating = db.Column(db.String(50),unique=False,nullable=False)
    created_at = db.Column(DateTime,nullable=False,default=datetime.now(timezone.utc))
    favorite_game = db.relationship('Favorite_game', backref='game',lazy=True)
    session = db.relationship('Session',backref='game',lazy=True)

    def __repr__(self):
       return f'<Game {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "platform":[platform.value for platform in self.platform],
            "released":self.released,
            "background_image":self.background_image,
            "type_game":[type_game.value for type_game in self.type_game],
            "rating":self.rating            
            # do not serialize the password, its a security breach
        }
  


class Favorite_game(db.Model):    
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'), primary_key=True, nullable=False)
    game_id = db.Column(db.Integer,db.ForeignKey('game.id'), primary_key=True, nullable=False)
    created_at = db.Column(DateTime,nullable=False,default=datetime.now(timezone.utc))

    def __repr__(self):
       return f'<Favorite_game user_id={self.user_id}, game_id={self.game_id}>'

    def serialize(self):
        return {            
            "user_id":self.user_id,
            "game_id":self.game_id                        
            # do not serialize the password, its a security breach
        }

class Friend_request(db.Model):    
    user_send_invite = db.Column(db.Integer,db.ForeignKey('user.id'), primary_key=True, nullable=False)
    user_receive_invite = db.Column(db.Integer,db.ForeignKey('user.id'), primary_key=True, nullable=False)
    created_at = db.Column(DateTime,nullable=False,default=datetime.now(timezone.utc))
    
    def __repr__(self):
       return f'<Friend_request user_send_invite={self.user_send_invite}, user_receive_invite={self.user_receive_invite}>'

    def serialize(self):
        return {            
            "user_send_invite":self.user_send_invite,
            "user_receive_invite":self.user_receive_invite                                 
            # do not serialize the password, its a security breach
        }

class Friendship(db.Model):   
    user_id_first = db.Column(db.Integer,db.ForeignKey('user.id'), primary_key=True, nullable=False)
    user_id_second = db.Column(db.Integer,db.ForeignKey('user.id'), primary_key=True, nullable=False)
    created_at = db.Column(DateTime,nullable=False,default=datetime.now(timezone.utc))

    def __repr__(self):
       return f'<Friendship user_id_first={self.user_id_first}, user_id_second={self.user_id_second}>'

    def serialize(self):
        return {           
            "user_id_first":self.user_id_first,
            "user_id_second":self.user_id_second                                
            # do not serialize the password, its a security breach
        }

class Subscription(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    purchase_user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    operation_number = db.Column(db.String(200),unique=True,nullable=False)    
    created_at = db.Column(DateTime,nullable=False,default=datetime.now(timezone.utc))

    def __repr__(self):
       return f'<Subscription {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "purchase_user_id":self.purchase_user_id,
            "operation_number":self.operation_number,
            "created_at":self.created_at                                           
            # do not serialize the password, its a security breach
        }

class Session(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    game_id = db.Column(db.Integer,db.ForeignKey('game.id'))
    host_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    start_date = db.Column(db.DateTime,unique=False,nullable=False)
    duration = db.Column(Enum(Duration),unique=False,nullable=False)
    language = db.Column(Enum(Language),unique=False,nullable=False)
    session_type = db.Column(Enum(SessionType),unique=False,nullable=False)
    region = db.Column(Enum(Region),unique=False,nullable=False)
    background_img = db.Column(db.String(200),unique=False,nullable=False)
    description = db.Column(db.String(200),unique=False,nullable=False)
    capacity = db.Column(db.Integer,unique=False,nullable=False)
    created_at = db.Column(DateTime,nullable=False,default=datetime.now(timezone.utc))
    updated_at = db.Column(DateTime,nullable=False,default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    session_member = db.relationship('Session_member',backref='session',lazy=True)

    def __repr__(self):
       return f'<Session {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "game_id":self.game_id,
            "host_id":self.host_id,
            "start_date":self.start_date,
            "duration":self.duration.value,
            "language":self.language.value,
            "session_type":self.session_type.value,
            "region":self.region.value,
            "background_img":self.background_img,
            "description":self.description,
            "capacity":self.capacity
            # do not serialize the password, its a security breach
        }
    
    
class Session_member(db.Model):
    session_id = db.Column(db.Integer,db.ForeignKey('session.id'), primary_key=True, nullable=False)
    participant_id = db.Column(db.Integer,db.ForeignKey('user.id'), primary_key=True, nullable=False)

    def __repr__(self):
       return f'<Session_member session_id={self.session_id}, participant_id={self.participant_id}>'

    def serialize(self):
        return {            
           "session_id":self.session_id,
           "participant_id":self.participant_id                                       
            # do not serialize the password, its a security breach
        }
  

