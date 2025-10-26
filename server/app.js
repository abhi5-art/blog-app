const express=require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');//this third party module used to print request url in console
dotenv.config();
const cors = require('cors');//allows server to accept the request from diifferent origins

const connectMongodb = require('./init/mongodb');
const {authRoute, categoryRoute, fileRoute, postRoute} = require('./routes');
const {errorHandler}= require('./middlewares');
const notfound = require('./controllers/notfound');

//init app
const app=express();

//database connection
connectMongodb();

//third party middlewares
app.use(cors({ origin : "http://localhost:5173"}));
app.use(express.json({limit:"500mb"}));
app.use(bodyParser.urlencoded({limit:"500mb", extended:true}));
app.use(morgan("dev"));

//route section 
app.use("/api/v1/auth" , authRoute);
app.use("/api/v1/category" , categoryRoute);
app.use("/api/v1/file", fileRoute);
app.use("/api/v1/posts", postRoute);

//not found route : if any request-route not matches to defined-routes on server then notfound controller will handle that request-route
app.use(/.*/, notfound);


//error Handling Middlewares
app.use(errorHandler);

module.exports=app;