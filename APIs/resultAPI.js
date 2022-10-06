const exp = require('express');
const resultApp = exp.Router();
const expressAsyncHandler = require('express-async-handler')

//to extract body of request obj
resultApp.use(exp.json())

resultApp.put('/add', expressAsyncHandler(async (request, response) => {

    //get userCollection obj
    let userCollectionObj = request.app.get("userCollectionObj");

    let currUsername = request.body.username;

    let user = await userCollectionObj.findOne({ username: currUsername });

    user.testStarted += 1;
    user.testsCompleted += 1;
    user.timeTyping += request.body.result.testTime;
    user.tests = [request.body.result, ...user.tests]

    let prev = user[String(request.body.result.testTime) + "s"].wpm;
    let preva = user[String(request.body.result.testTime) + "s"].acc;
    let currw = request.body.result.wpm;
    let curra = request.body.result.accuracy;

    if (prev < currw) {

        user[String(request.body.result.testTime) + "s"].wpm = currw;
        user[String(request.body.result.testTime) + "s"].acc = curra;

    }
    else if (prev == currw) {

        if (preva < curra) {
            user[String(request.body.result.testTime) + "s"].acc = curra;
        }

    }

    await userCollectionObj.updateOne({ username: currUsername }, { $set: { ...user } });

    response.send({ message: "Test saved", user: user });

}))


module.exports = resultApp;