const express=require('express')
const { CONNECTION_STRING}=require('./config')
const {mongoose}= require('mongoose')
var cors = require('cors')
const app = express()
const productRouters = require('./api/routers/productRouters')
const usersRouter =require('./api/routers/usersRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)
.then(res=>console.log('connect'))
.catch(err=>console.log(err))

app.use('/api/product',productRouters)
app.use('/api/user', usersRouter)

app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})
module.exports=app