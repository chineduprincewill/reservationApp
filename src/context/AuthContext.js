import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);

    const authenticate = (usertoken, userObject) => {

        localStorage.setItem('ls_token', usertoken);
        localStorage.setItem('ls_user', JSON.stringify(userObject));
        localStorage.setItem('ls_isAuthenticated', true);
    }

    const logout = () => {
        setToken('');
        localStorage.removeItem('ls_token');


        setIsAuthenticated(false);
        localStorage.removeItem('ls_isAuthenticated');

        setUser(null);
        localStorage.removeItem('ls_user');
    }


    useEffect(() => {
        
        if(localStorage.getItem('ls_token')){
            setToken(localStorage.getItem('ls_token'));
        }
    }, [])

    useEffect(() => {
        const loginStatus = localStorage.getItem('ls_isAuthenticated');
        if(loginStatus){
            setIsAuthenticated(loginStatus);
        }
    }, [])

    useEffect(() => {
        if(localStorage.getItem('ls_user')){
            setUser(JSON.parse(localStorage.getItem('ls_user')));
        }
    }, [])

    return(
        <AuthContext.Provider value={{isAuthenticated, token, authenticate, logout, user}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;