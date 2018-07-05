from bson import ObjectId
import json

from flask import jsonify


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


class DefaultResponse:
    def getOk(self, data):
        return jsonify({"status": "OK",
                        "statusCode": "200",
                        "data": JSONEncoder().encode(data)})

    def getError(self, msg, statusCode):
        return jsonify({"status": "ERROR",
                        "statusCode": statusCode,
                        "msg": msg})
