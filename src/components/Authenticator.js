import React, {useState} from 'react'
import App from '../App'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import SignUpComponent from './SignUpComponent';
import '../App.css'

function Authenticator({isDark}) {
    const [openSignUpComp, setopenSignUpComp] = useState(false)  // true ise signup componenti göster
    const [openLogInComponent, setopenLogInComponent] = useState(false)

    const auth = getAuth();

    const LogInComponent = ({isDark}) => {

        const [email, setemail] = useState("")
        const [password, setpassword] = useState("")

        const keyboardInput = (e) => {
            if(e.key === "Enter"){
                loginFunc()
            }
        }
    
        const loginFunc = () => {  // login işlemi
    
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === true){

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            if (user){
            }
                console.log("login success")
            })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    
        }
        else{
            alert("Please enter a valid email address")
        }}
        
        return (
            <>
            <div className="login-container" style={
                isDark ? {backgroundColor:"rgba(21,34,56,0.98)",transition:"2s"}
                        :{backgroundColor:"rgb(179,206,229)",transition:"2s"}}>

                <span style={isDark? {color:"wheat",cursor:'pointer',position:'absolute',top:'1rem',right:'1rem'}:{color:"black",cursor:'pointer',position:'absolute',top:'1rem',right:'1rem'}} onClick={()=>{setopenLogInComponent(!openLogInComponent)}}>X</span>

                <span style={isDark?{height:"auto",fontSize:"2vh",color:"wheat"}:{height:"auto",fontSize:"2vh",color:"black"}}>Login</span>
                <input id='login-signup-input' type="email" placeholder="E-mail..." onChange={e => setemail(e.target.value)} style={{
                    width:"90%",
                    height:"30px",
                    borderRadius:"25px",
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    marginTop:"2%",
                    }}> 
                    </input>
                <input id='login-signup-input' type="password" placeholder="Password..." onKeyPress={keyboardInput} onChange={e => setpassword(e.target.value)} style={{
                   width:"90%",
                   height:"30px",
                   borderRadius:"25px",
                   backgroundColor:"rgba(255,255,255,0.1)",
                   border:"none",
                   marginTop:"2%",
                    }}>
                    </input>
                    <button onClick={()=> loginFunc()} style={!isDark ? {
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    marginBottom:"1%",
                    marginTop:"1.5%",
                    transition:"2s",
                    cursor:"pointer",
                    borderRadius:"25px",
                } : {
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    marginBottom:"1%",
                    marginTop:"1.5%",
                    color:"wheat",
                    transition:"2s",
                    cursor:"pointer",
                    borderRadius:"25px"
                }
                }>
                    Login</button>
            </div>
            </>
        )
    }


    return (
        <>
        <div className="authenticator-div" style={{width: "8%",height:"50px",position:"absolute"}}>
            <span style={{position:"absolute",width:"100%",display:"flex",flexDirection:"column"}}>
                <button onClick={()=> {setopenLogInComponent(!openLogInComponent);setopenSignUpComp(false)}} style={!isDark ? {
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    marginLeft:"1%",
                    marginTop:"1.5%",
                    transition:"2s",
                    cursor:"pointer",
                    borderTopLeftRadius:"25px"
                } : {
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    marginLeft:"1%",
                    marginTop:"1.5%",
                    color:"wheat",
                    transition:"2s",
                    cursor:"pointer",
                    borderTopLeftRadius:"25px"
                }
                }>
                    {openLogInComponent ? "X" : "Login"}</button>
                <button onClick={()=> {setopenSignUpComp(!openSignUpComp);setopenLogInComponent(false)}} style={!isDark ?{
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    borderBottomRightRadius:"25px",
                    transition:"2s",
                    cursor:"pointer" } : {
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    borderBottomRightRadius:"25px",
                    transition:"2s",
                    color:"wheat",
                    cursor:"pointer"
                    }
                }>
                    {openSignUpComp ? "X" : "Sign Up"}</button>
            </span>
        </div>
        {openSignUpComp ? <SignUpComponent isDark={isDark} signUpComp={openSignUpComp} close={close=>setopenSignUpComp()} /> : null}
        {openLogInComponent ? <LogInComponent isDark={isDark} /> : null}
        </>
    )
}

export default Authenticator
