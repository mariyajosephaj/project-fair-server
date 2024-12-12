require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

// Creates an Express application. The express() function is a top-level function exported by the express module.
// express server creation
const pfServer = express()


pfServer.use(cors())
// Returns middleware (function) that only parses json
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))



const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Project fair server started at port: ${PORT} and waiting for client request !!`);
    
})
// controller
pfServer.get('/',(req,res)=>{

    res.status(200).send(`<h1 style="color:red"> Project fare server started and waiting for client request !!</h1>`)

})

