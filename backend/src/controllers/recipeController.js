const {putData,delData,getDataByID,getData,updatedata,addCommand,addRating,getDataByUser} =require("../repository/recipeRepo");

exports.putRecipe=async (req,res) => {
    if(!req || !req.body)
    {
        console.log(req.body);
        return res.status(404).send("body not found");
    }
    else{
        const body=req.body;
        return res.status(200).json(await putData(body));
    }

}

exports.delRecipe=async (req,res) => {
    if(!req || !req.body)
    {
        console.log(req.body);
        return res.status(404).send("body not found");
    }
    const recipe=await getDataByID(req.params.id);
    if(!recipe.exists)
    {
        return res.status(404).send("recipe not found");
    }
    await delData(req.params.id);
    return res.status(200).send("recipe deleted successfully");
}

exports.getById=async (req,res) => {
    const recipe=await getDataByID(req.params.id);
    if(!recipe.exists)
    {
        return res.status(404).send("recipe not found");
    }
    return res.status(200).json({ id: recipe.id, ...recipe.data() });
}

exports.getAllRecipe=async (req,res) => {
    const recipe=await getData();
    return res.status(200).json(recipe);
}

exports.updateRecipe=async (req,res) => {
    if(!req || !req.body)
    {
        console.log(req.body);
        return res.status(404).send("body not found");
    }
    const id=req.params.id;
    const data=req.body;
    await updatedata(data,id);
    return res.status(200).send("updated successfully");
}

exports.addCommand=async (req,res) => {
    if(!req || !req.body)
    {
        console.log(req.body);
        return res.status(404).send("body not found");
    }
    const id=req.params.id;
    const cmd=req.body.cmd;
    const rate=req.body.rate;
    await addCommand(id,cmd,rate);
    return res.status(200).send("command added successfully");
}

exports.addRate=async (req,res) => {
    if(!req || !req.body)
    {
        console.log(req.body);
        return res.status(404).send("body not found");
    }
    const id=req.params.id;
    const rate=req.body.rate;
    await addRating(id,rate);
    return res.status(200).send("Rating added successfully");
}

exports.getRecipeById=async (req,res) => {
    const id=req.params.id;
    const data=await getDataByUser(id)
    return res.status(200).json(data);
}

