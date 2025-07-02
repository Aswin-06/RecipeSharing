import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";


function Home()
{
    const [data,changeData]=useState([]);
    const [token,changetoken]=useState(localStorage.getItem("token")||"");
    const navigate=useNavigate();

    useEffect(()=>
    {
        const fetch=async () => {
            if(token==="")
                navigate("/")
            else{
                try {
                    const response = await axios.get("https://recipesharing-kv1d.onrender.com/api/recipe",{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    changeData(response.data);
                } catch (error) {
                    alert(error.response.data);
                    navigate("/");
                }
            }
        }
        fetch();
    },[])

    const tags=data.map(datum=><Link className="recipe-card" key={datum.id} to={`/recipe/${datum.id}`}>
    <div>
        <img src={`/asserts/${datum.image}`} alt={datum.title} />
        <p>{datum.title}</p>
        <p>{datum.category}</p>
        <p>{datum.description}</p> 
    </div>
    </Link>)

    return(
        <div className="home-container">
            {tags}
            <div className="buttons-container">
                <button className="home-button" onClick={(e)=>
                    {
                        e.preventDefault();
                        navigate("/add")
                    }
                }>Add recipe</button>
                <button className="home-button" onClick={(e)=>
                    {
                        e.preventDefault();
                        navigate("/userdetails")
                    }
                }>User Details</button>
                <button className="home-button" onClick={(e)=>
                    {
                        e.preventDefault();
                        navigate("/");
                    }
                }>Log Out</button>
            </div>
        </div>
    )
}

export default Home;