
import React,{useState} from "react"
const AuthContext = React.createContext({
    token:'',
    id:'',
    login: (token ,id) => {},
    logout: () => {}
});


export const AuthContextProvider = (props) => {
    const initialToken  = localStorage.getItem('token');
    const initialId = localStorage.getItem('id');
    const [token, setToken] = useState(initialToken);
    const [id , setId ] = useState(initialId);

    const loginHandler = (token , id) => {
        setToken(token);
        setId(id);
        /* const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60); */
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        
    };
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const authContext = {
        token:token,
        id:id,
        login:loginHandler,
        logout:logoutHandler
    }

    return (
    <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>
    );    
}

export default AuthContext;