const exp = require('express');
const app = exp();
const mclient = require("mongodb").MongoClient;

require('dotenv').config();

//import path module
const path = require('path');

//connect build of react app with node.js
app.use(exp.static(path.join(__dirname, './build')))

//Database connection URL
const DBurl = process.env.DBURL;


//connect with mongodb
mclient.connect(DBurl)
    .then((client) => {

        //get DB object
        let dbObj = client.db("MadhuDB");

        //create collection obj
        let userCollectionObj = dbObj.collection("userCollection");

        //sharing collections objects to api's
        app.set("userCollectionObj", userCollectionObj);

        console.log("Database connection successful")
    })
    .catch(err => console.log('Error in Database connection', err))


//import other APIs
const userApp = require('./APIs/userAPI');
const resultApp = require('./APIs/resultAPI')

app.use('/user', userApp);
app.use('/result', resultApp);

//dealing with page refresh
app.use('*', (request, response) => {
    response.sendFile(path.join(__dirname, './build/index.html'))
})

//exception handling
app.use((request, response, next) => {
    response.send({ message: `${request.url} is invalid path` })
})


//error handling
app.use((error, request, response, next) => {
    response.send({ message: `Error occurred`, reason: `${error.message}` })
})

//assign port number
const port = process.env.PORT
app.listen(port, () => {
    console.log(`server listening on port ${port}...`);
})

