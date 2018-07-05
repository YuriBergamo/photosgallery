import React from 'react'
import axios from 'axios'

const URL_API = 'http://localhost:5000/api';

function get(url) {
    return axios.get(URL_API + url);
}

function post(url, data) {
    console.log("POST API", URL_API + url)
    return axios.post(URL_API + url, data);
}

function handlePost(promise) {
    return new Promise(
        (resolve, reject) => {
            promise.then((res=>{
                if(res){
                    if(res.data.statusCode == "200"){
                        console.log(res.data);
                        resolve(JSON.parse(res.data.data));
                    }else{
                        reject(res.data.msg);
                    }
                }else{
                    reject(res.data.msg);
                }
            }))
        }
    )
}

export default {
    'get': function (url) {
        return get(url)
    },
    'post': function (url, data) {
        return handlePost(post(url, data));
    }
}