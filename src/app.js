const express=require('express')
const { CONNECTION_STRING}=require('./config')
const {mongoose}= require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();
const userRouter = require('./api/routers/user');
const User = require('./models/user');
const newsrouter =require('./api/routers/newsrouter')
const chat = require('../src/api/routers/chatrouter')
const cover =require('../src/api/routers/converroter')
app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)
.then(res=>console.log('connect'))
.catch(err=>console.log(err))
// app.options("*", cors({ origin: ['http://localhost:19007', 'http://localhost:8082', 'https://bankapi-2puz.onrender.com'], optionsSuccessStatus: 200 }));
// app.options('*', cors());

// app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use('/api/user',userRouter);
app.use('/api/new',newsrouter);
app.use('/api/user' , chat)
app.use('/api/user' , cover)



app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})
module.exports=app