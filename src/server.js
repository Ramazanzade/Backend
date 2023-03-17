const http =require('http')
// const {PORT}=require('./config')
const app =require('./app')
require('dotenv').config();

const server = http.createServer(app)

server.listen(8082)


