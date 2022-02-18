import React, {useState} from 'react'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import "firebase/auth";

import db from '../firebaseDB'
import {doc, setDoc} from "firebase/firestore"
import '../App.css'



function SignUpComponent(props) {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const auth = getAuth();
    const user = auth.currentUser

    const signUpFunc = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === true){ 
            createUserWithEmailAndPassword(auth, email, password)
            .then(function () {
                alert("Sign Up Successful")
            })
            .then(async () => {
                let loggedinUser = await getAuth().currentUser
                setDoc(doc(db,"users",`${loggedinUser.uid}`), {
                    UID: loggedinUser.uid,
                    NAME: loggedinUser.displayName,
                    EMAIL: loggedinUser.email,
                    W: []
                })
            } )
            .catch(function (error) {
                alert(error.message)
            })
        }
        else{
            alert("Invalid Email")
        }
    }

    const keyboardInput = (e) => {
        if(e.key === "Enter"){
            signUpFunc()
        }
    }



    return (
        <div className="signup-container" style={
            props.isDark ? {backgroundColor:"rgba(21,34,56,0.98)",transition:"2s"}
                    :{backgroundColor:"rgb(179,206,229)",transition:"2s"}}>
            <span style={props.isDark? {color:"wheat",cursor:'pointer',position:'absolute',top:'1rem',right:'1rem'}:{color:"black",cursor:'pointer',position:'absolute',top:'1rem',right:'1rem'}} onClick={()=>{props.close(false)}}>X</span>            
            <span style={props.isDark?{height:"auto",fontSize:"2vh",color:"wheat"}:{height:"auto",fontSize:"2vh",color:"black"}}>Sign Up</span>

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
                    marginTop:"1.5%"
                    }}>
                    </input>
            <button onClick={() => signUpFunc()} style={
                !props.isDark ? {
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    marginTop:"1.5%",
                    transition:"2s",
                    borderRadius:"20px",
                    cursor:"pointer"
                } : {
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    marginTop:"1.5%",
                    borderRadius:"20px",
                    color:"wheat",
                    transition:"2s",
                    cursor:"pointer"}
                } >Sign Up</button>
        </div>
    )
}

export default SignUpComponent
