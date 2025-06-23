import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Update.css";

function Update()
{
    const [data,changeData]=useState({});
    const {id}=useParams();
    const navigate=useNavigate();
    const [token,changetoken]=useState(localStorage.getItem("token")||"")

    useEffect(()=>
    {
        const fetch=async () => {
            if(token==="")
                navigate("/")
            else
            {
                try {
                    const response = await axios.get(`https://recipesharing-kv1d.onrender.com/api/recipe/${id}`,{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    changeData(response.data);
                } catch (error) {
                    alert(error.response.data);
                    navigate("/")
                }
            }
        }
        fetch();
    },[])

    const alterData=(e)=>
    {
        const {name,value}=e.target;
        changeData({...data,[name]:value});
    }

    return(
        <div className="update-container">
            <button onClick={(e)=>
                {
                    e.preventDefault();
                    navigate(`/recipe/${id}`);
                }
            } className="back1">←</button>
            <h3 className="update-label">Enter the name of the recipe</h3>
            <input type="text" name="title" onChange={alterData} value={data.title} className="update-input" />
            <h3 className="update-label">Choose the Category</h3>
            <select name="category" onChange={alterData} value={data.category} className="update-input">
                <option value="">Select</option>
                <option value="Breakfast">BreakFast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </select>
            <h3 className="update-label">Add Description</h3>
            <input type="text" name="description" onChange={alterData} value={data.description} className="update-input" />
            <h3 className="update-label">Add Image</h3>
            <select name="image" onChange={alterData} value={data.image} className="update-input">
                <option value="">Select</option>
                <option value="dosa.jpg">Dosa</option>
                <option value="idly.jpg">Idly</option>
            </select>
            <h3 className="update-label">Add Instruction</h3>
            <input type="text" name="instructions" onChange={alterData} value={data.instructions} className="update-input" />
            <button className="update-button" onClick={async(e)=>
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
                                await axios.put(`https://recipesharing-kv1d.onrender.com/api/recipe/${id}`,data,{
                                    headers:{
                                        Authorization:`Bearer ${token}`,
                                        "Content-Type":"application/json"
                                    }
                                });
                                navigate("/home");
                            } catch (error) {
                                alert(error.response.data);
                            }
                        }
                    }
                }
            }>Update</button>
        </div>
    )
} 

export default Update;