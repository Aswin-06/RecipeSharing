import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserDetails()
{
    const [data,changedata]=useState([]);
    const [id,changeid]=useState(localStorage.getItem("id")||"")
    const [token,change]=useState(localStorage.getItem("token")||"")
    const navigate=useNavigate();

    useEffect(()=>
    {
        const fetch=async () => {
            if(token==="")
                navigate("/")
            try {
                const response = await axios.get(`http://localhost:8080/api/recipe/user/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                changedata(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    },[])

    const tags=data.map(datum=><p>{datum.title}</p>)
    return(
        <div>
            <h3>Recipe Added by you</h3>
            {tags}
        </div>
    )
}

export default UserDetails;