const express=require("express")
const app=express();
const cors=require("cors")
const route=require("./src/routes/recipeRoute")
const userroute=require("./src/routes/userRoutes")
const {authenticate}=require("./src/controllers/userController")

app.use(express.json());
app.use(cors());
app.use("/api",authenticate,route);
app.use("/user",userroute);


app.listen(8080,()=>
{
    console.log("successfully executed");
})