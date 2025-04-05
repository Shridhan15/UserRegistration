const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotev = require("dotenv").config();//first install dotenv

connectDb();
const app = express();
const port = process.env.PORT || 5000;//now port =5001 from .env file


app.use(express.json());//to parse data received from user
app.use('/api/contacts', require("./routes/contactRoutes"));//use act as a middleware,get api reqest from contactRoutes
app.use('/api/users', require("./routes/userRoutes"));
app.use(errorHandler);//using a erro handler middleware
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

//use thunder client to test APIs

