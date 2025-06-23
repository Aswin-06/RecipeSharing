import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Command.css";

function Command()
{
    const [data,changedata]=useState({cmd:"",rate:0});
    const {id}=useParams();
    const [token,changeToken]=useState(localStorage.getItem("token")||"")
    const navigate=useNavigate();

    const alterData=(e)=>
    {
        const {name,value}=e.target;
        if(name==="rate")
        {
            changedata({...data,[name]:parseInt(value)});
            return;
        }
        changedata({...data,[name]:value});
    }

    return(
        <div className="command-container">
            <button onClick={(e)=>
                {
                    e.preventDefault();
                    navigate(`/recipe/${id}`);
                }
            } className="back1">←</button>
            <h3 className="command-heading">Give the commands</h3>
            <input type="text" name="cmd" onChange={alterData} className="command-input"  />
            <h2 className="command-heading">Rate the recipe</h2>
            <select name="rate" onChange={alterData} className="command-select">
                <option value={0}>select</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <button className="command-button" onClick={async (e) => {
                e.preventDefault();
                if(data.cmd===""||data.rate===0)
                    alert("enter the value");
                else
                {
                    try {
                        if(token==="")
                            navigate("/")
                        await axios.post(`https://recipesharing-kv1d.onrender.com/api/command/${id}`,data,{
                            headers:
                            {
                                Authorization:`Bearer ${token}`,
                                "Content-Type":"application/json"
                            }
                        })
                        navigate(`/recipe/${id}`);
                    } catch (error) {
                        navigate("/")
                    }
                }
            }}>Add</button>
        </div>
    )

}

export default Command;