const express=require('express')
const { CONNECTION_STRING}=require('./config')
const {mongoose}= require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();
const userRouter = require('./api/routers/user');
const User = require('./models/user');
const newsrouter =require('./api/routers/newsrouter')
const newsrouter1 =require('./api/routers/newsrouter1')
const newsrouter2 =require('./api/routers/newsrouter2')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)
.then(res=>console.log('connect'))
.catch(err=>console.log(err))
// app.options('*', cors());
app.options("*", cors({ origin: ['http://localhost:19006', 'http://localhost:8082', 'https://bankapi-2puz.onrender.com'], optionsSuccessStatus: 200 }));
app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use('/api/user',userRouter);
app.use('/api/new',newsrouter);
app.use('/api/new1',newsrouter1);
app.use('/api/new2',newsrouter2);





app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})
module.exports=app