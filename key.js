
/*const mongoUrl="mongodb+srv://panditprashant5670:1OR3u55a9fwuQLnw@cluster0.4vnjhwo.mongodb.net/";
module.exports=mongoUrl;*/
const mongoose=require("mongoose");
const DB="mongodb+srv://panditprashant5670:MZvXlMKXmy7IXT5S@test-pro-db.knbomht.mongodb.net/insta?retryWrites=true&w=majority&appName=test-pro-db"
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=>console.log("Database connected")).catch((error)=>{
    console.log(err);
})

