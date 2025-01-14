const  express = require('express')
const app = express()
const port = process.env.port || 4000
const cors=require("cors");
const path=require("path")

require("./key")




require('./modules/model')
require('./modules/post')
app.use(cors())
app.use(express.json())
app.use(require("./router/auth"))
app.use(require("./router/createPost"))
app.use(require("./router/user"))


//serving the frontend
app.use(express.static(path.join(__dirname,"./client/dist")))

app.get("*",(req,res)=>{
     res.sendFile(
       path.join(__dirname, "./client/dist/index.html")   
     ),
     function(err){
          res.status(500).send(err)
     }
})

app.listen(port, () =>{
     console.log(`Example app listening on port ${port}!`)
    });