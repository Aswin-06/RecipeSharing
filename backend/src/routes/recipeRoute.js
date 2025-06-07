const {putRecipe,delRecipe,getById,getAllRecipe,updateRecipe,addCommand,addRate,getRecipeById}=require("../controllers/recipeController")
const express=require("express")
const route=express.Router();

route.post("/recipe",putRecipe);
route.delete("/recipe/:id",delRecipe);
route.get("/recipe/:id",getById);
route.get("/recipe",getAllRecipe);
route.put("/recipe/:id",updateRecipe);
route.post("/command/:id",addCommand);
route.post("rating/:id",addRate);
route.get("/recipe/user/:id",getRecipeById)

module.exports=route;