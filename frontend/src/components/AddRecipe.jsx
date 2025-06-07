import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipe.css"

function AddRecipe()
{
    const [data,changeData]=useState({category:"",cmds:[],description:"",image:"",instructions:"",rate:[],title:""});
    const [ingre,changeIngre]=useState([]);
    const [text,changeText]=useState("");
    const [token,changeToken]=useState(localStorage.getItem("token")||"")
    const [id,changeId]=useState(localStorage.getItem("id")||"")
    const navigate=useNavigate();
    const alterData=(e)=>
    {
        const {name,value}=e.target;
        changeData({...data,[name]:value});
    }

    const tags=ingre.map(item=><p>{item}</p>)

    return(
        <div className="add-recipe-container">
        
            <h3 className="form-title">Enter the name of the recipe</h3>
            <input className="form-input" type="text" name="title" onChange={alterData} />
            <h3 className="form-title">Choose the Category</h3>
            <select className="form-select" name="category" onChange={alterData}>
                <option value="">Select</option>
                <option value="Breakfast">BreakFast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </select>
            <h3 className="form-title">Add Description</h3>
            <input className="form-input" type="text" name="description" onChange={alterData} />
            <h3 className="form-title">Add Image</h3>
            <select className="form-select" name="image" onChange={alterData}>
                <option value="">Select</option>
                <option value="dosa.jpg">Dosa</option>
                <option value="idly.jpg">Idly</option>
            </select>
            <h3 className="form-title">Add ingredients</h3>
            <input className="form-input" type="text" onChange={(e)=>{changeText(e.target.value)}} />
            <button className="btn btn-add" onClick={(e)=>
                {
                    e.preventDefault();
                    if(text!="")
                    {
                        ingre.push(text);
                        changeText("");
                    }
                }
            }>Add</button>
            {tags}
            <h3>Add Instruction</h3>
            <input className="form-input" type="text" name="instructions" onChange={alterData}  />
            <button className="btn btn-submit" onClick={async(e)=>
                {
                    e.preventDefault();
                    if(data.category===""||data.description===""||data.image===""||data.title===""||data.instructions==="")
                        alert("enter all the details")
                    else{
                        if(token==="")
                        {
                            alert("please login to continue");
                        }
                        else{
                            try {
                                const data1={...data,createdBy:id};
                                const data2={...data1,ingrediants:ingre}
                                await axios.post("http://localhost:8080/api/recipe",data2,{
                                    headers:{
                                        Authorization:`Bearer ${token}`,
                                        "Content-Type":"application/json"
                                    }
                                })
                                navigate("/home");
                            } catch (error) {
                                alert(error.response.data);
                            }
                        }
                    }
                }
            }>Add Recipe</button>
            
        
        </div>
    )
}

export default AddRecipe;