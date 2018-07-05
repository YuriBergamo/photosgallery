from flask import Flask, jsonify, url_for, redirect, request
from flask_pymongo import PyMongo
from flask_restful import Api, Resource
from utils import DefaultResponse

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "photosgallery"
mongo = PyMongo(app, config_prefix='MONGO')
APP_URL = "http://127.0.0.1:5000"


class Login(Resource):
    def post(self):
        login = request.get_json()
        if login:
            user = mongo.db.user.find_one({
                "username": login.get("username"),
                "password": login.get("password")
            })
            if user:
                # user was logged, return the user to save in localstorage of client
                return DefaultResponse().getOk(user)
            else:
                # something is wrong! or username or password
                return DefaultResponse().getError("Username or Password is invalid!", "401")

        return DefaultResponse().getError("Invalid user", "500")


class User(Resource):
    def get(self):
        data = []
        for user in mongo.db.user.find({}):
            data.append(user)
        return DefaultResponse().getOk(data)

    def post(self):
        new_user = request.get_json()
        if not new_user:
            return DefaultResponse().getError("Invalid user", "500")
        type_of_user = new_user.get('type')
        if type_of_user:
            # check if is a friend
            if not type_of_user == "friend":
                if mongo.db.user.find_one({"type": type_of_user}):
                    # find a bride or bridegoom
                    return DefaultResponse().getError("Already have an user with this type!", "404")

            user = mongo.user.insert(new_user)
            return DefaultResponse().getOk(user)


def getUserType(id_user):
    user_logged = mongo.db.user.find_one({"_id": id_user})
    if user_logged:
        return user_logged.get("type")


class Photo(Resource):
    def get(self, id_user):
        # this method returns all photos by de user id
        # if the user is a bride or bridegroom this method returns all photos
        type_of_user = getUserType(id_user)
        data = []
        photos_cursor = None
        if type_of_user:
            if type_of_user == 'friend':
                # find just the photos that user uploads and all photos approved by the bride
                photos_cursor = mongo.db.photos.find({
                    '$or': [
                        {
                            'user_id': id_user
                        },
                        {
                            'approved': True
                        }
                    ]
                })
            else:
                photos_cursor = mongo.db.photos.find({})
        # user isn't find
        if photos_cursor:
            for photo in photos_cursor:
                data.append(photo)
            return DefaultResponse().getOk(data)

        return DefaultResponse().getError("Erro to find the photos", "404")

    def post(self):
        new_photo = request.get_json()
        # TODO validate if have an image
        user = mongo.photo.insert(new_photo)
        return DefaultResponse().getOk(user)

    def put(self, id_user):
        # this method set the approved
        # only call by the admin (bride)
        photo_approved = request.get_json()
        if photo_approved:
            type_of_user = getUserType(id_user)
            if type_of_user and not type_of_user == 'friend':
                # it's the admin, set the approved
                mongo.db.photos.update({'_id': photo_approved.get("_id")}, {'$set': photo_approved})
                return DefaultResponse().getOk(True)
            else:
                return DefaultResponse().getError("You don't have a permission to approve photos!", "403")

        return DefaultResponse().getError("Invalid photo!", "500")


class Index(Resource):
    def get(self):
        return redirect(url_for("users"))


api = Api(app)
api.add_resource(Index, "/api", endpoint="index")
api.add_resource(Login, "/api/login", endpoint="login")
api.add_resource(User, "/api/users", endpoint="users")
api.add_resource(Photo, "/api/photos/<string:id_user>", endpoint="photos")

if __name__ == "__main__":
    app.run(debug=True)
