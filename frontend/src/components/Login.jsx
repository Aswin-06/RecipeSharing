import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import "./Login.css"
function Login()
{
    const navigate=useNavigate();
    const [data,changedata]=useState({username:"",password:""});

    const alterData=(e)=>{
        const {name,value}=e.target;
        changedata({...data,[name]:value});
    }

    return(
        <div className="login-container">
            <div className="login-box">
                <h2>Enter the details</h2>
                <form>
                    <label>Enter your username</label><br />
                    <input type="text" name="username" onChange={alterData} /><br />
                    <label>Enter your password</label><br />
                    <input type="password" name="password" onChange={alterData} /><br />
                    <button onClick={async(e)=>
                        {
                            e.preventDefault();
                            if(data.username===""||data.password==="")
                            {
                                alert("enter the username and password");
                            }
                            else
                            {
                                try {
                                    const response = await axios.post("https://recipesharing-kv1d.onrender.com/user/login",data);
                                    localStorage.setItem("id",response.data.id);
                                    localStorage.setItem("token",response.data.token);
                                    navigate("/home")
                                } catch (error) {
                                    alert(error.response.data);
                                }
                            }
                        }
                    }>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;