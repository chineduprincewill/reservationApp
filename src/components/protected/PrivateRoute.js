import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


export const PrivateRoute = ({ children }) => {

    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    console.log(token);

    if(!token || token === ''){
        navigate('/login');
    } 
     
    
    return children;
};
