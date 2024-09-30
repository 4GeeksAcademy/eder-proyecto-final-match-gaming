
import click
from api.models import db, User, Game
"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""


""" EN ESTE FILE SE HAN DEFINIDO DOS COMANDOS PARA POBER POBLAR DE FORMA AUTOMATICA LA BASE DE DATOS, TANTOS USUARIOS COMO JUEGOS 
SOLO DEBEN EJECTUAR DENTRO DE SU VENV (pipenv shell) LOS SIGUIENTES COMANDOS 1) " FLASK INSERT-TEST-USERS "  2) " FLASK INSERT-TEST-GAMES "  EN LA TERMINAL """



data_users = [
    {
        "user_type":"NORMAL",
        "username":"anjhelogg",
        "email":"anjhelogg@anjhelogg.com",
        "password":"123456",
        "first_name":"anjhelo",
        "last_name":"geeks",
        "age":20,
        "discord_id":"mydiscord_id",
        "steam_id":"mysteam_id",
        "schedule":"MORNING",
        "description":"loremm loremloremlorem loremloremlorem lorem loremloremlorem lorem lorem lorem",
        "region":"NA",
        "gender":"M",
        "platform":['STEAM','PLAY'],
        "type_game":['ADVENTURE','ACTION'],
        "profile_img_url":"https://plus.unsplash.com/premium_photo-1669343628944-d0e2d053a5e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        "user_type":"NORMAL",
        "username":"edergg",
        "email":"edergg@edergg.com",
        "password":"123456",
        "first_name":"eder",
        "last_name":"geeks",
        "age":21,
        "discord_id":"mydiscord_id",
        "steam_id":"mysteam_id",
        "schedule":"EVENING",
        "description":"loremm loremloremlorem loremloremlorem lorem loremloremlorem lorem lorem lorem",
        "region":"NA",
        "gender":"M",
        "platform":['STEAM'],
        "type_game":['ADVENTURE','ACTION'],
        "profile_img_url":"https://plus.unsplash.com/premium_photo-1669343628944-d0e2d053a5e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        "user_type":"NORMAL",
        "username":"maribelgg",
        "email":"maribelgg@maribelgg.com",
        "password":"123456",
        "first_name":"maribel",
        "last_name":"geeks",
        "age":22,
        "discord_id":"mydiscord_id",
        "steam_id":"mysteam_id",
        "schedule":"MORNING",
        "description":"loremm loremloremlorem loremloremlorem lorem loremloremlorem lorem lorem lorem",
        "region":"NA",
        "gender":"F",
        "platform":['STEAM','PLAY'],
        "type_game":['STRATEGY'],
        "profile_img_url":"https://plus.unsplash.com/premium_photo-1669343628944-d0e2d053a5e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
    },
     {
        "user_type":"NORMAL",
        "username":"carlosgg",
        "email":"carlosgg@carlosgg.com",
        "password":"123456",
        "first_name":"carlos",
        "last_name":"geeks",
        "age":22,
        "discord_id":"mydiscord_id",
        "steam_id":"mysteam_id",
        "schedule":"MORNING",
        "description":"loremm loremloremlorem loremloremlorem lorem loremloremlorem lorem lorem lorem",
        "region":"NA",
        "gender":"M",
        "platform":['STEAM'],
        "type_game":['ADVENTURE','ACTION'],
        "profile_img_url":"https://plus.unsplash.com/premium_photo-1669343628944-d0e2d053a5e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        "user_type":"NORMAL",
        "username":"yonilgg",
        "email":"yonilgg@yonilgg.com",
        "password":"123456",
        "first_name":"yonil",
        "last_name":"geeks",
        "age":20,
        "discord_id":"mydiscord_id",
        "steam_id":"mysteam_id",
        "schedule":"MORNING",
        "description":"loremm loremloremlorem loremloremlorem lorem loremloremlorem lorem lorem lorem",
        "region":"NA",
        "gender":"M",
        "platform":['STEAM','PLAY','XBOX'],
        "type_game":['ADVENTURE','ACTION','SPORTS'],
        "profile_img_url":"https://plus.unsplash.com/premium_photo-1669343628944-d0e2d053a5e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
    }     

]



data_games = [
   { "name": "Counter-Strike: Global Offensive",
    "platform": ['XBOX','STEAM'],
    "released" : "2012-08-21 16:29:00+00:00",
    "background_image": "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg",
    "game_type": ['SHOOTER'],
    "rating": 4},

    {"name": "Left 4 Dead 2",
    "platform": ['XBOX','STEAM'],
    "released" : "2009-11-17 16:48:00+00:00",
    "background_image": "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg",
    "game_type": ['SHOOTER'],
    "rating": 4
    },
     {"name": "God of War (2018)",
    "platform": ['PLAY','STEAM'],
    "released" : "2018-04-20 16:53:00+00:00",
    "background_image": "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
    "game_type": ['ACTION'],
    "rating": 5
    },
     {"name": "The Witcher 3: Wild Hunt",
    "platform": ['XBOX','STEAM','PLAY'],
    "released" : "2015-05-15 16:59:00+00:00",
    "background_image": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    "game_type": ['ACTION','ADVENTURE'],
    "rating": 5
    },
     {"name": "Amnesia: The Dark Descen",
    "platform": ['STEAM'],
    "released" : "2010-09-08 17:05:00+00:00",
    "background_image": "https://media.rawg.io/media/games/b54/b54598d1d5cc31899f4f0a7e3122a7b0.jpg",
    "game_type": ['ADVENTURE'],
    "rating": 4
    },
     {"name": "The Last Of Us",
    "platform": ['XBOX','STEAM','PLAY'],
    "released" : "2013-06-14 17:14:00+00:00",
    "background_image": "https://media.rawg.io/media/games/a5a/a5a7fb8d9cb8063a8b42ee002b410db6.jpg",
    "game_type": ['ADVENTURE'],
    "rating": 5
    },
     {"name": "Resident Evil 3",
    "platform": ['XBOX','STEAM','PLAY'],
    "released" : "2020-04-02 17:20:00+00:00",
    "background_image": "https://media.rawg.io/media/games/a4b/a4bb55f42fe837ae7bf1307e7b41cc85.jpg",
    "game_type": ['ADVENTURE'],
    "rating": 4
    },
     {"name": "Alien: Isolation",
    "platform": ['STEAM'],
    "released" : "2014-10-05 17:22:00+00:00",
    "background_image": "https://media.rawg.io/media/games/daa/daaee07fcb40744d90cf8142f94a241f.jpg",
    "game_type": ['ADVENTURE'],
    "rating": 5
    },
     {"name": "The Elder Scrolls V: Skyrim",
    "platform": ['PLAY','STEAM'],
    "released" : "2011-11-11 17:28:00+00:00",
    "background_image": "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
    "game_type": ['RPG'],
    "rating": 5
    },
     {"name": "Path of Exile",
    "platform": ['STEAM'],
    "released" : "2013-10-23 17:31:00+00:00	",
    "background_image": "https://media.rawg.io/media/games/d0f/d0f91fe1d92332147e5db74e207cfc7a.jpg",
    "game_type": ['RPG'],
    "rating": 5
    },
     {"name": "Dota 2",
    "platform": ['STEAM'],
    "released" : "2013-07-09 17:36:00+00:00",
    "background_image": "https://media.rawg.io/media/games/6fc/6fcf4cd3b17c288821388e6085bb0fc9.jpg",
    "game_type": ['ACTION'],
    "rating": 5
    },
     {"name": "FIFA 18",
    "platform": ['PLAY','XBOX'],
    "released" : "2017-09-26 17:40:00+00:00",
    "background_image": "https://media.rawg.io/media/games/cb4/cb487ab3c54b81cb685388bab42ec848.jpeg",
    "game_type": ['SPORTS'],
    "rating": 4
    },
     {"name": "F1 22",
    "platform": ['XBOX','STEAM','PLAY'],
    "released" : "2022-06-30 17:44:00+00:00",
    "background_image": "https://media.rawg.io/media/games/3cb/3cbf69d79420191a2255ffe6a580889e.jpg",
    "game_type": ['SPORTS'],
    "rating": 4
    },
     {"name": "Company of Heroes 2",
    "platform": ['STEAM'],
    "released" : "2013-06-25 17:47:00+00:00",
    "background_image": "https://media.rawg.io/media/games/0bd/0bd5646a3d8ee0ac3314bced91ea306d.jpg",
    "game_type": ['STRATEGY'],
    "rating": 4
    },
     {"name": "GTFO",
    "platform": ['STEAM'],
    "released" : "2021-12-09 17:49:00+00:00",
    "background_image": "https://media.rawg.io/media/games/814/8140301ae3791d2cd4303d6c6f485b9a.jpg	",
    "game_type": ['STRATEGY'],
    "rating": 5
    }
]

def setup_commands(app):    
    
    @app.cli.command("insert-test-users") # name of our command   
    def insert_test_users():

        print("Creating test users")

        for data in data_users:
        
            user = User()
            user.user_type = data['user_type']
            user.username = data['username']
            user.email = data['email']
            user.password = data['password']
            user.first_name = data['first_name']
            user.last_name = data['last_name']
            user.age = data['age']
            user.discord_id = data['discord_id']
            user.steam_id = data['steam_id']
            user.schedule = data['schedule']
            user.description = data['description']            
            user.region = data['region']
            user.gender = data['gender']
            user.platform = data['platform']
            user.type_game = data['type_game']
            user.profile_img_url = data['profile_img_url']
            db.session.add(user)

        for data in data_games:     
            game= Game()
            game.name = data['name']
            game.platform = data['platform']
            game.released = data['released']
            game.background_image = data['background_image']
            game.type_game = data['game_type']
            game.rating = data['rating']
            db.session.add(game)
        db.session.commit()

        print("All test users created!")

    @app.cli.command("insert-test-games")
    def insert_test_games():

        print('Creating games...')
        for data in data_games:     
            game= Game()
            game.name = data['name']
            game.platform = data['platform']
            game.released = data['released']
            game.background_image = data['background_image']
            game.type_game = data['game_type']
            game.rating = data['rating']
            db.session.add(game)
        db.session.commit()
        print("All test games created!")

