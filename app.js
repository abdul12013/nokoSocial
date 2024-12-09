const express = require("express");
require("../chattingApp/config/mongoose-connection")

const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const usersRouters = require("./routes/userRoute")
let port = process.env.PORT || 3000;
//importing database model

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.set("view engine", "ejs");



app.use(usersRouters);

app.get("/",(req,res)=>{
  
  res.render("login")
})



app.listen(process.env.PORT,()=>{
   console.log(`http//localhost:${port}`)
})


