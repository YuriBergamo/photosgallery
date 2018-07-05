from flask import Flask, jsonify, url_for, redirect, request
from flask_pymongo import PyMongo
from flask_restful import Api, Resource
from flask_cors import CORS
from bson import ObjectId
from utils import DefaultResponse

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["MONGO_DBNAME"] = "photosgallery"
mongo = PyMongo(app, config_prefix='MONGO')
APP_URL = "http://localhost:5000"


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

            user = mongo.db.user.insert(new_user)
            if user:
                return DefaultResponse().getOk(mongo.db.user.find_one({"_id": user}))
        return DefaultResponse().getError("Invalid user", "500")


def getUserType(id_user):
    user_logged = mongo.db.user.find_one({"_id": ObjectId(id_user)})
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
                photos_cursor = mongo.db.photo.find({"$or": [
                    {
                        'user_id': id_user
                    },
                    {
                        "approved":True
                    }
                ]})

            else:
                photos_cursor = mongo.db.photo.find({})

        if photos_cursor:
            for photo in photos_cursor:
                data.append(photo)

            if data:
                return DefaultResponse().getOk(data)

        return DefaultResponse().getError("Erro to find the photos", "404")

    def post(self):
        new_photo = request.get_json()
        if new_photo:
            if new_photo.get('user_id'):
                type_of_user = getUserType(new_photo.get('user_id'))
                if not type_of_user == 'friend':
                    # just put the approved check because is the admin
                    new_photo["approved"] = True
                else:
                    new_photo["approved"] = False

                photo_db = mongo.db.photo.insert(new_photo)
                if photo_db:
                    return DefaultResponse().getOk(mongo.db.photo.find_one({"_id": photo_db}))
            else:
                return DefaultResponse().getError("User not allowed to upload new photos!", "401")
        return DefaultResponse().getError("Invalid photo", "500")


class PhotoApproved(Resource):
    def post(self, id_user):
        # this method set the approved
        # only call by the admin (bride)
        photo_approved = request.get_json()
        if photo_approved:
            type_of_user = getUserType(id_user)
            if type_of_user and not type_of_user == 'friend':
                # it's the admin, set the approved
                photo_db = mongo.db.photo.find_one({'_id': ObjectId(photo_approved.get("id"))})
                photo_db["approved"] = True
                mongo.db.photo.update({'_id': ObjectId(photo_db.get("_id"))}, {'$set': photo_db})
                return DefaultResponse().getOk(True)
            else:
                return DefaultResponse().getError("You don't have a permission to approve photos!", "403")

        return DefaultResponse().getError("Invalid photo!", "500")


class PhotoLike(Resource):
    def post(self):
        # this method ++ the likes in database
        photo_to_like = request.get_json()
        if photo_to_like:
            photo_db = mongo.db.photo.find_one({'_id': ObjectId(photo_to_like.get("id"))})
            if photo_db:
                likes = int(photo_db["likes"]) + 1
                photo_db["likes"] = likes
                mongo.db.photo.update({'_id': ObjectId(photo_db.get("_id"))}, {"$set": photo_db})
                return DefaultResponse().getOk({"photo_id": photo_db.get("_id"), "likes": likes})
        return DefaultResponse().getError("Invalid photo!", "500")


class Index(Resource):
    def get(self):
        return redirect(url_for("users"))


api = Api(app)
api.add_resource(Index, "/api", endpoint="index")
api.add_resource(Login, "/api/login", endpoint="login")
api.add_resource(User, "/api/users", endpoint="users")
api.add_resource(Photo, "/api/photos", endpoint="photos")
api.add_resource(Photo, "/api/photos/<string:id_user>", endpoint="user")
api.add_resource(PhotoApproved, "/api/photos/approve/<string:id_user>", endpoint="approve")
api.add_resource(PhotoLike, "/api/photos/like", endpoint="like")

if __name__ == "__main__":
    app.run(debug=True)
