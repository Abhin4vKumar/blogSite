import Head from 'next/head';
import React, { Fragment , useState  , useEffect} from 'react';
import {useDispatch , useSelector} from "react-redux";
import { useAlert } from 'react-alert';
import { login , register } from '@/src/actions/userActions';
import { useRouter } from 'next/router';
import { CLEAR_ERRORS } from '@/src/constants/blogConstants';

function LoginPage() {
    const dispatch = useDispatch();
    const alertobj = useAlert();
    const router = useRouter();
    const { error, loading, isAuthenticated , user} = useSelector(
        (state) => state.user
      );
    if(error){
        alertobj.error(error.message);
        dispatch({type:CLEAR_ERRORS});
    }
    useEffect(()=>{
        if(isAuthenticated){
            console.log(user);
            router.replace("/blogs");
        }
    } , [isAuthenticated])
  const [loginUsername, setLUsername] = useState('');
  const [loginPassword, setLPassword] = useState('');
  const [name , setName] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');
  const [registerUsername, setRUsername] = useState('');
  const [registerPassword, setRPassword] = useState('');
  const [activeState , setAS] = useState('');
  const [checkboxR , setRCheckState] = useState(true);
  const [remMe , setRemMe] = useState(false);
  const [registerEmail , setRUEmail] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    if(isEmpty(loginUsername)){
        alertobj.error("Enter E-mail !!");
        return;
    }
    if(isEmpty(loginPassword)){
        alertobj.error("Enter Password !!");
        return;
    }
    dispatch(login({email:loginUsername,password:loginPassword}))
  };
  const handleRCheckbox = (e)=>{
    setRCheckState(! e.target.checked);
  }
  const handleRemMe = (e)=>{
    setRemMe(e.target.checked);
    if(e.target.checked){
        alertobj.info(":) Will Remember You ♥");
    }else{
        alertobj.info("Alright , NVM :(");
    }
  }
  function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }
  const handleRegister = (e) => {
    e.preventDefault();
    if(isEmpty(name)){
        alertobj.error("Enter Name !!");
        return;
    }
    if(isEmpty(registerUsername)){
        alertobj.error("Enter Username !!");
        return;
    }
    if(isEmpty(registerEmail)){
        alertobj.error("Enter E-mail !!");
        return;
    }
    if(isEmpty(registerPassword)){
        alertobj.error("Enter Password !!");
        return;
    }
    if(isEmpty(confirmPassword)){
        alertobj.error("Enter Confirm Password !!");
        return;
    }
    if(confirmPassword == registerPassword){
        dispatch(register({name,userName:registerUsername,email:registerEmail,password:registerPassword}));    
    }else{
        setRPassword("");
        setConfirmPassword("");
        alertobj.error("Passwords Doesn't Match")
    }
  };
  const markActive = (e) =>{
    e.preventDefault();
    setAS('active');
  };
  const markInActive = (e) =>{
    e.preventDefault();
    setAS('');
  };
return (
    <Fragment>
        <Head>
        <title>Authentication</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {/* {loading? <Loader/> :  */}
    <div className={'mainLoginPage' + ' ' + activeState}>

    <div className={"logincontainer" + ' ' + activeState}>
        <div className="forms">
            <div className="form login">
                <span className="title">Login</span>

                <form action="#">
                    <div className="input-field">
                        <input type="text" value={loginUsername} placeholder="Enter your E-mail or Username" onChange={(e) => {setLUsername(e.target.value)}} required />
                        <i className="uil uil-envelope icon"></i>
                    </div>
                    <div className="input-field">
                        <input type="password" value={loginPassword} className="password" placeholder="Enter your password" onChange={(e) => {setLPassword(e.target.value)}} required />
                        <i className="uil uil-lock icon"></i>
                        <i className="uil uil-eye-slash showHidePw"></i>
                    </div>

                    <div className="checkbox-text">
                        <div className="checkbox-content">
                            <input type="checkbox" checked={remMe} onChange={handleRemMe}id="logCheck" />
                            <label for="logCheck"   className="text">Remember me</label>
                        </div>
                        
                        <a className="text">Forgot password?</a>
                    </div>

                    <div className="input-field button">
                        <input type="button" onClick={handleLogin} value="Login" />
                    </div>
                </form>

                <div className="login-signup">
                    <span className="text">Not a member ?
                        <a className="text signup-link" onClick={markActive}>Signup Now</a>
                    </span>
                </div>
            </div>

            <div className="form signup">
                <span className="title">Registration</span>

                <form action="#">
                    <div className="input-field">
                        <input type="text" value={name} placeholder="Enter your name" onChange={(e) => {setName(e.target.value)}} required />
                        <i className="uil uil-user"></i>
                    </div>
                    <div className="input-field">
                        <input type="text" value={registerUsername} placeholder="Enter your Username" onChange={(e) => {setRUsername(e.target.value)}} required /> 
                        <i className="uil uil-envelope icon"></i>
                    </div>
                    <div className="input-field">
                        <input type="text" value={registerEmail} placeholder="Enter your E-mail" onChange={(e) => {setRUEmail(e.target.value)}} required /> 
                        <i className="uil uil-envelope icon"></i>
                    </div>
                    <div className="input-field">
                        <input type="password" value={registerPassword} className="password" placeholder="Create a password" onChange={(e) => {setRPassword(e.target.value)}} required />
                        <i className="uil uil-lock icon"></i>
                    </div>
                    <div className="input-field">
                        <input type="password" value={confirmPassword} className="password" placeholder="Confirm a password" onChange={(e) => {setConfirmPassword(e.target.value)}} required />
                        <i className="uil uil-lock icon"></i>
                        <i className="uil uil-eye-slash showHidePw"></i>
                    </div>

                    <div className="checkbox-text">
                        <div className="checkbox-content">
                            <input type="checkbox" checked = {!checkboxR} id="termCon" onChange={handleRCheckbox}/>
                            <label for="termCon" className="text">I accepted all terms and conditions</label>
                        </div>
                    </div>

                    <div className="input-field button">
                        <input type="submit" onClick={handleRegister} value="Signup" disabled={checkboxR}/>
                    </div>
                </form>

                <div className="login-signup">
                    <span className="text">Already a member ?
                        <a  className="text login-link" onClick={markInActive}>Login Now</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
    </div>
    {/* } */}
    </Fragment>
    )
}

export default LoginPage;