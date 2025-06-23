import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import "./Signup.css"
function Signup()
{
    const navigate=useNavigate();
    const [data,changedata]=useState({username:"",password:""});

    const alterData=(e)=>{
        const {name,value}=e.target;
        changedata({...data,[name]:value});
    }

    return(
        <div className="signup-container">
            <button onClick={(e)=>
                {
                    e.preventDefault();
                    navigate("/");
                }
            } className="back1">←</button>
            <div className="signup-box">
                <h2>Sign up</h2>
                <form>
                    <label>Enter your username</label><br />
                    <input type="text" name="username" onChange={alterData} /><br />
                    <label>Enter your password</label><br />
                    <input type="password" name="password" onChange={alterData} /><br />
                    <button className="b2" onClick={async(e)=>
                        {
                            e.preventDefault();
                            if(data.username===""||data.password==="")
                            {
                                alert("enter the username and password");
                            }
                            else
                            {
                                try {
                                    await axios.post("https://recipesharing-kv1d.onrender.com/user/register",data);
                                    navigate("/login")
                                } catch (error) {
                                    alert(error.response.data);
                                }
                            }
                        }
                    } type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;