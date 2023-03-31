const express=require('express')
const { CONNECTION_STRING}=require('./config')
const {mongoose}= require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();
// const productRouters = require('./api/routers/productRouters')
const userRouter = require('./api/routers/user');
const User = require('./models/user');
const newsrouter =require('./api/routers/newsrouter')  
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)
.then(res=>console.log('connect'))
.catch(err=>console.log(err))
// app.options("*", cors({ origin: ['http://localhost:19006', 'http://localhost:8082', 'https://bankapi-2puz.onrender.com'], optionsSuccessStatus: 200 }));
// app.use(cors({ origin: 'http://localhost:19006'}));
// app.options('*', cors());

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

const allowedOrigins = ['http://localhost:19006', 'http://localhost:8082', 'https://bankapi-2puz.onrender.com'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    
    return callback(null, true);
  },
  credentials: true
}));

app.options('*', cors({
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credentials: true
}));
  
app.use('/api/user',userRouter);
app.use('/api/new',newsrouter);



app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})
module.exports=app