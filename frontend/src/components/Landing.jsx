import { useNavigate } from "react-router-dom";
import "./landing.css"; 

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="cont">
            <div className="card">
                <h2>Welcome to the Recipe Sharing Platform</h2>
                <h4>Please login or register to share your recipe</h4>

                <div className="button">
                    <button onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                    }}>Login</button>

                    <button onClick={(e) => {
                        e.preventDefault();
                        navigate("/signup");
                    }}>Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Landing;
