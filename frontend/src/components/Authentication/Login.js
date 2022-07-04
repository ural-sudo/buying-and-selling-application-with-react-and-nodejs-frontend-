
import './Login.css'
import React,{useReducer,useContext, useState} from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';


const emailReducer = (state, action) => {
    if(action.type === 'USER_INPUT'){
        return {
            value: action.value,
            isValid: action.value.includes('@')
        }
    };
    if(action.type === 'SUBMIT'){
        return {value:action.value, isValid:true}
    };
    
};
const passwordReducer = (state,action) =>{
    if(action.type === 'USER_INPUT'){
        return {
            value:action.value
        }
    };
    if(action.type === 'SUBMIT'){
        return {value:action.value, isValid:true}
    };
   
} 
const Login = (props) => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const [info, setInfo] = useState('');
    const [checkFalsey, setCheckFalsey] = useState(false);
    const [loading, setLoading ] = useState('');
    const [emailState, dispatchEmail] = useReducer(emailReducer, {value:'', isValid:true});
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'', isvalid:true})

    const emailChangeHandler = (event) => {
        dispatchEmail({type:'USER_INPUT', value:event.target.value})
    };
    const passwordChangeHandler = (event) => {
        dispatchPassword({type:'USER_INPUT', value:event.target.value})
    }
    

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading('sending')
        try{
            const response = await fetch('http://localhost:8080/auth/login',{
            method:'POST',
            body:JSON.stringify({
                email:emailState.value,
                password:passwordState.value
            }),
            headers:{
                'Content-Type': 'application/json'
            }
            });
            const responseData = await response.json();
            console.log(responseData);
            if(responseData.message){
                setCheckFalsey(true);
                setInfo(responseData.message);
            }else{
                authCtx.login(responseData.token, responseData.id);
                
                history.replace('/home');
            }
            
        }catch(error){
            console.log(error);
        }
        dispatchEmail({type:'SUBMIT', value:''});
        dispatchPassword({type:'SUBMIT', value:''});
        setLoading('');
    };

    const emailClasses = emailState.isValid ? 'login-form__item': 'invalid';

    return(
        <React.Fragment>
            <section className='login-form'>
                {checkFalsey && <p className='failed'>{info}</p>}
                <h2 className='login-form__title'>Login</h2>
                <form onSubmit={formSubmitHandler}>
                    <div className={emailClasses}>
                        <label>E-mail</label>
                        <input value={emailState.value} type='text' onChange={emailChangeHandler}/>
                        {!emailState.isValid && <p style={{marginTop:'10px'}}>Your email should includes @ char</p>}
                    </div>
                    <div className='login-form__item'>
                        <label>Password</label>
                        <input value={passwordState.value} type='password' onChange={passwordChangeHandler}/>
                    </div>
                    <div className='login-form__item'>
                        <button>Login</button>
                    </div>
                    {loading};
                </form>
            </section>
        </React.Fragment>
    );
}

export default Login;