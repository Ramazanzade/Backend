const express=require('express')
const { CONNECTION_STRING}=require('./config')
const {mongoose}= require('mongoose')
var cors = require('cors')
const app = express()
require('dotenv').config();
const productRouters = require('./api/routers/productRouters')
const userRouter = require('./api/routers/user');
const User = require('./models/user');
const newsrouter =require('./api/routers/newsrouter')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)
.then(res=>console.log('connect'))
.catch(err=>console.log(err))
app.options("*", cors({ origin: 'http://localhost:19007' || "http://localhost:8082", optionsSuccessStatus: 200 }));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use('/api/product',productRouters)
app.use('/api/user',userRouter);
app.use('/api/new',newsrouter);



app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})
module.exports=app