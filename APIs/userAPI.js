const exp = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcyrptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userApp = exp.Router();
const verifyPassword = require('./Middlewares/VerifyPassword');

require('dotenv').config();

//to extract body of request obj
userApp.use(exp.json())


userApp.get('/get-users', expressAsyncHandler(async (request, response) => {

    //get userCollection object
    let userCollectionObj = request.app.get("userCollectionObj");

    let users = await userCollectionObj.find().toArray();

    response.send({ message: "all users", payload: users })

}));

userApp.get('/get-user/:username', expressAsyncHandler(async (request, response) => {

    //get userCollection obj
    let userCollectionObj = request.app.get("userCollectionObj");

    let usrnm = request.params.username;

    let user = await userCollectionObj.findOne({ username: usrnm });

    if (user != null) {
        response.send({ message: "user", payload: user });
    }
    else {
        response.send({ message: "user not existed" });
    }

}));

userApp.post('/create-user', expressAsyncHandler(async (request, response) => {

    //get userCollection object
    let userCollectionObj = request.app.get("userCollectionObj");

    //extract user obj from request
    let newUser = request.body;

    //check for existence 
    let alreadyExists = await userCollectionObj.findOne({ username: newUser.username });

    if (alreadyExists) {
        response.send({ message: "username taken" })
    }
    else {
        //hash the password
        let hashedPassword = await bcyrptjs.hash(newUser.password, 6);

        //Replace the plain password with hashedPassword
        newUser.password = hashedPassword;

        //insert the user to the database
        await userCollectionObj.insertOne(newUser);

        response.send({ message: "User registration successful" });
    }

}))

userApp.post('/login', expressAsyncHandler(async (request, response) => {

    //get userCollection obj
    let userCollectionObj = request.app.get("userCollectionObj");

    //get userCredentianls from request body
    let userCred = request.body;

    //verify username and password
    let isExists = await userCollectionObj.findOne({ username: userCred.username })

    if (isExists == null) {
        response.send({ message: "user not found" });
    }
    else {

        //verify passwords

        //hashedpassword comparing to plain password

        let isMatch = await bcyrptjs.compare(userCred.password, isExists.password);

        if (isMatch == false) {
            response.send({ message: "Incorrect Password" });
        }
        else {

            //create json web token
            let token = jwt.sign({ username: isExists.username }, process.env.SECRET_KEY, { expiresIn: 60 });

            //send signed web toke
            response.send({ message: "login successful", payload: token, user: isExists });

        }
    }
}))

userApp.put('/update-user', verifyPassword, expressAsyncHandler(async (request, response) => {

    //get userCollection obj
    let userCollectionObj = request.app.get("userCollectionObj");

    let modifiedUser = request.body;

    //if change in email
    if (modifiedUser.changes["cemail"] != undefined) {

        modifiedUser.user.email = modifiedUser.changes.email;

        await userCollectionObj.updateOne({ username: modifiedUser.user.username }, { $set: { email: modifiedUser.user.email } });

    }
    else {

        //if change in password
        let hashedPassword = await bcyrptjs.hash(modifiedUser.changes.newpassword, 6);
        modifiedUser.user.password = hashedPassword;

        await userCollectionObj.updateOne({ username: modifiedUser.user.username }, { $set: { password: modifiedUser.user.password } });

    }


    await userCollectionObj.updateOne({ username: modifiedUser.user.username }, { $set: { email: modifiedUser.user.email } });

    let userObj = await userCollectionObj.findOne({ username: modifiedUser.user.username });

    response.send({ message: "User details updated", user: userObj })

}));

userApp.delete('/delete-user/:username', expressAsyncHandler(async (request, response) => {

    //get userCollection obj
    let userCollectionObj = request.app.get("userCollectionObj");

    let user = request.params.username;

    let res = await userCollectionObj.deleteOne({ username: { $eq: user } });

    response.send({ message: "success", user: {} });

}));


userApp.put('/erase', expressAsyncHandler(async (request, response) => {

    let userCollectionObj = request.app.get("userCollectionObj");

    await userCollectionObj.updateOne({ username: request.body.username }, { $set: { testStarted: 0, testsCompleted: 0, timeTyping: 0, tests: [], "15s": {}, "30s": {}, "60s": {}, "120s": {} } })

    let userObj = await userCollectionObj.findOne({ username: request.body.username })

    response.send({ message: "success", user: userObj });

}))

module.exports = userApp;