
import React,{useState} from "react";
import {Link} from 'react-router-dom';
import './SignUp.css'

const Signup = (props) => {
    let formIsValid = true;
    const [enteredName, setEnteredName] =useState('');
    const [enteredSurname, setEnteredSurname] = useState('');
    const [enteredPassword,setEnteredPassword] =useState('');
    const [enteredEmail,setEnteredEmail] = useState('');
    const [checkEmail,setCheckEmail] = useState(true);
    const [checkName, setCheckName] = useState(true);
    const [checkSurname , setCheckSurname] = useState(true);
    const [checkPassword ,setCheckPassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [info , setInfo] =useState('');
    const [checkTrueInfo , setCheckTrueInfo] =useState(false);
    const [checkFalseInfo , setCheckFalseInfo] = useState(false);
   

    const nameChangeHandler = (event) =>{
        setEnteredName(event.target.value);
        
        if(event.target.value.trim() === '') {
            setCheckName(false);
            return;
        }
        setCheckName(true);
    };
    const surnameChangeHandler = (event) => {
        setEnteredSurname(event.target.value);
        if(event.target.value.trim() === ''){
            setCheckSurname(false);
            return;
        }
        setCheckSurname(true);

    }
    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
        if(event.target.value.trim() === '') {
            setCheckEmail(false);
            return;
        };
        setCheckEmail(true);
    }
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
        if(event.target.value.trim().length < 5){
            setCheckPassword(false);
            return;
        }
        setCheckPassword(true);
    };
    
    
    const formSubmitHandler = async (event) => {
        
        event.preventDefault();
        setIsLoading(true)
        
        if(enteredName.trim() === ''){
            setCheckName(false);
            
        };
        if(enteredSurname.trim().length < 1){
            setCheckSurname(false);
            
        }
        if(enteredEmail.trim().length < 1 ){
            setCheckEmail(false);
            
        }
        if(enteredPassword.trim().length < 5){
            setCheckPassword(false);
        }
        
        try{
            const response = await fetch('http://localhost:8080/auth/signUp', {
            method : 'POST',
            body: JSON.stringify({
                name:enteredName,
                surname:enteredSurname,
                email:enteredEmail,
                password:enteredPassword
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        const responseData = await response.json();
        if(!responseData.message){
            setCheckTrueInfo(true);
            setInfo('Registration Successful');
            setCheckFalseInfo(false);
        }else{
            setCheckFalseInfo(true);
            setInfo(responseData.message);
            setCheckTrueInfo(false);
        }
        console.log(responseData);
        }catch(error){
            console.log(error);
        }
        
        
        if(enteredEmail&& enteredName && enteredPassword && enteredSurname){
            setEnteredEmail('');
            setEnteredName('');
            setEnteredPassword('');
            setEnteredSurname('');
        }
        
        setIsLoading(false);
        

    }
    const checkForm = checkName  && checkEmail && checkPassword && checkSurname;
        if(checkForm){
            formIsValid=true;
        }else{
            formIsValid=false;
        }     
    
    
    const classesName = checkName ? 'auth-form__item': 'invalid';
    const classesSurname = checkSurname ? 'auth-form__item': 'invalid';
    const classesEmail = checkEmail ? 'auth-form__item' : 'invalid';
    const classesPassword = checkPassword ? 'auth-form__item' : 'invalid';
    const classesButton = formIsValid ? 'auth-form__item': 'disabled'
   
    return (
        <React.Fragment>
              <section className="auth-form">
                  {checkTrueInfo && <p className="success">{info}</p>}
                  {checkFalseInfo && <p className="failed">{info}</p>}
                  <h2 className="auth-title">Registraion</h2>
                  <form onSubmit={formSubmitHandler}>
                      <div className={classesName}>
                          <label>Name</label>
                          <input type='text'value={enteredName} onChange={nameChangeHandler}/>
                          {!checkName && <p style={{color:'red', marginTop:'5px'}}>This field not be empty </p>}
                      </div>
                      <div className={classesSurname}>
                          <label>Surname</label>
                          <input type='text' value={enteredSurname} onChange={surnameChangeHandler} />
                          {!checkSurname && <p style={{color:'red', marginTop:'5px'}}>This field not be empty </p> }
                      </div>
                      <div className={classesEmail}>
                          <label>Email</label>
                          <input type='email' value={enteredEmail} onChange={emailChangeHandler} />
                          {!checkEmail && <p style={{color:'red', marginTop:'5px'}}>This field not be empty </p> }
                      </div>
                      <div className={classesPassword}>
                          <label>Password</label>
                          <input type='password' value={enteredPassword} onChange={passwordChangeHandler}/>
                          {!checkPassword && <p style={{color:'red', marginTop:'5px'}}>Your password should be strong</p> }
                      </div>
                      {isLoading && <p>Sending...</p>}
                      
                      <div className={classesButton} >
                        <button disabled={!formIsValid}  type="submit">Register</button>
                      </div>
                      <div>
                        <span>İf you have an account  </span>
                        <Link to='/auth/login'>Login</Link>
                      </div>
                      
                  </form>
              </section>
        </React.Fragment>
    );

}

export default Signup;