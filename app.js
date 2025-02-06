const express = require('express')
const mainRouter = require('./routes/main.routes.js');
const app = express()
const port = 8090
const dotnev = require("dotenv");
const cors = require("cors");
const errorHandler = require('./errorHandler/globalErrorHandler.js');
dotnev.config();
 


const corsOptions = {
    origin:true,
    credentials: true,
    methods: ['GET', 'PATCH', 'PUT', 'POST','DELETE'],
    allowedHeaders: ['Origin','Access-Control-Allow-Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-refresh-token', 'x-user-role','x-verify-token'],
    optionsSuccessStatus: 204,
  }; 


app.use(cors(corsOptions));
app.use(express.json())
app.use('/',mainRouter)
app.use(errorHandler)






app.listen(port,()=>{
    console.log( `server listening on port  ${port}  `)
})