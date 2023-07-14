const express = require("express")
const cors = require('cors')
const app = express()
const PORT = 5000
const mongoose = require("mongoose")
const {MONGOURI} = require("./keys.js")

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeah")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user.js')
require('./models/post.js')

app.use(cors())

app.use(express.json())
app.use(require('./routes/auth.js'))
app.use(require('./routes/post.js'))

app.listen(PORT,function(){
    console.log("Server running on port",PORT)
})




// const customMiddleware = function(req,res,next){
//     console.log("Middleware exicuted")
//     next()
// }

// app.get("/",function(req,res){
//     res.send("HIUe")
// })

// app.get("/home",(req,res)=>{
//     res.send("home page")
// })
// app.get("/about",customMiddleware,(req,res)=>{
//     res.send("about page")
// })
// left =10 right = 5
