import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Details.css"

function Details(){
    const [data,changeData]=useState({});
    const [token,changeTOken]=useState(localStorage.getItem("token")||"")
    const navigate=useNavigate();
    const {id}=useParams();
    const [userid,changeId]=useState(localStorage.getItem("id")||"")
    const [isCreated,changeCreated]=useState(false)

    useEffect(()=>
    {
        const fetch=async () => {
            if(token==="")
                navigate("/")
            else
            {
                try {
                    const response = await axios.get(`http://localhost:8080/api/recipe/${id}`,{
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
    })

    useEffect(() => {
        if (String(userid) === String(data.createdBy)) {
            changeCreated(true);
        } else {
            changeCreated(false);
        }
    }, [data, userid]);
    const tags = data.ingrediants?.map(ingre => <p className="detail-tag" key={ingre}>{ingre}</p>) || null;
    const tags1 = data.cmds?.map(cmd => <p key={cmd} className="detail-command">{cmd}</p>) || null;
    const getAverage = (arr) => {
        if (arr.length === 0) 
            return 0; 
        return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(1);
    };
    const avg=getAverage(data.rate||[]);

    return(
        <div className="details-container">
            <img src={`/asserts/${data.image}`} alt={data.title} className="recipe-image" />
            <div className="details-content">
                <h2>Title : {data.title}</h2>
                <p>Category : {data.category}</p>
                <p>Description : {data.description}</p>
                <p>Instructions : {data.instructions}</p>
                <div>
                    <p>Ingrediants : </p>
                    {tags}
                </div>
                <p>Rating : {avg}</p>
                <br />
                <div>
                    <p>Commands : </p>
                    {tags1}
                </div>
                <button button className="btn btn-primary" onClick={(e)=>{
                    e.preventDefault();
                    navigate(`/addcommand/${id}`)
                }}>Add command and rating</button>
                {
                    isCreated&&(<><button className="btn btn-danger" onClick={async(e)=>
                    {
                        e.preventDefault();
                        try {
                            await axios.delete(`http://localhost:8080/api/recipe/${id}`,{
                                headers:{
                                    Authorization:`Bearer ${token}`
                                }
                            })
                        } catch (error) {
                            alert(error.response.data);
                            navigate("/");
                        }
                    }
                    }>Delete recipe</button>
                    <button className="btn btn-secondary" onClick={(e)=>
                        {
                            e.preventDefault();
                            navigate(`/update/${id}`);
                        }
                    }>Update recipe</button>
                    </>)
                }
            </div>
        </div>
    )
}

export default Details;