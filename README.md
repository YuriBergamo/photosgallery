# Photos Gallery Challenge
That's a test for a python developer job

# Project Information
This project was build to introduce some conceps of Python services with React.js, using the fallow stack:
  - React.js (with sass)
  - Axios connections 
  - Flask framework api
  - Mongo.db
  - Docker
  
The main reason why I choose theese tecnologies is because I think in more reusable code and more flexibility to move to another server or something like that.

# How to run
First of all, do you need to install or update your python to version 3.6.x and Node to version 9.X.

## Download all dependencies

Create the virtualenv and install all of requirements on the api/requirements.txt using ```pip```

```pip install -r requirements.txt```

After that, inside the front-end folder, install dependencies using

```
   npm update
   npm install 
```
Ps: make sure that you have all permitions to do that step.


## Config the api service
If you will test at localhost, make sure that the React is redirect to the right place. In another worlds, you can change the API URL in  **front-end/src/app/connections/Connection.js** changing the ``` const URL_API ```

The API is configured at the port **8000** if you need to change that, see on **/api/app.py** and change this part:
```
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
```

## Runing the project
The front-end project you can run using the comand:
``` npm run start ``` 

The api, run these:
``` python app.py ```

# Do you wanna run on Docker?
Yes, you can! The api is prepared to run with containers.
All that you need to do is install the docker and the docker-compose
After that, inside the api folder, run the fallow commands:

```
  docker-compose build
  docker-compose up  
```

And that's it! Your api is running on **port 8000**

