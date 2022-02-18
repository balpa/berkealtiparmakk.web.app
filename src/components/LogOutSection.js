import React, {useState, } from 'react'
import { getAuth }from "firebase/auth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfilePage from './ProfilePage';
import CloseIcon from '@mui/icons-material/Close';

function LogOutSection({isDark}) {

    const auth = getAuth();
    const [show, setshow] = useState(false)
    const [showAreYouSure, setShowAreYouSure] = useState(false)

    const AreYouSure = () => {
        return (
            <div className="areYouSure" style={isDark ? {backgroundColor:'rgba(21,34,56,0.98)',color:'wheat',transition:'2s'}:{}}>
                Are you sure?
                <button style={isDark ? {padding:"0.5rem",cursor:"pointer",color:"wheat",width:"auto",height:"auto",border:"none",borderRadius:"20px",backgroundColor:"rgba(255,255,255,0.4)",fontSize:"2vh",transition:"2s"}:{padding:"0.5rem",cursor:"pointer",color:"black",width:"auto",height:"auto",border:"none",borderRadius:"20px", transition:"2s",backgroundColor:"rgba(255,255,255,0.4)",fontSize:"2vh",}}
                        onClick={()=>{auth.signOut()}}>Yes</button>
                <button style={isDark ? {padding:"0.5rem",cursor:"pointer",color:"wheat",width:"auto",height:"auto",border:"none",borderRadius:"20px",backgroundColor:"rgba(255,255,255,0.4)",fontSize:"2vh",transition:"2s"}:{padding:"0.5rem",cursor:"pointer",color:"black",width:"auto",height:"auto",border:"none",borderRadius:"20px", transition:"2s",backgroundColor:"rgba(255,255,255,0.4)",fontSize:"2vh",}}
                        onClick={()=>{setShowAreYouSure(false)}}>No</button>
            </div>
        )
    }

    return (
        <>
        <div style={{position:"absolute",display:"flex",flexDirection:"column",width:"4em",height:"6em",justifyContent:"center",alignItems:"center"}}>

            {isDark ? <AccountCircleIcon htmlColor="wheat" /> : <AccountCircleIcon />}

            <span style={isDark ? {color:"wheat",transition:"2s"}:{color:"black",transition:"2s"}}>{auth.currentUser.displayName}</span>

            
            <button style={isDark ? {
                backgroundColor:"rgba(255,255,255,0.1)",
                border:"none",
                marginLeft:"3%",
                transition:"2s",
                marginTop:"3%",
                cursor:"pointer",
                borderRadius:"25px",
                color:"wheat",
                } : 
                {
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    marginLeft:"3%",
                    transition:"2s",
                    marginTop:"3%",
                    cursor:"pointer",
                    borderRadius:"25px"
                    }} onClick={()=> {setshow(!show)}}>profile</button>
            <button style={isDark ? {
                backgroundColor:"rgba(255,255,255,0.1)",
                border:"none",
                marginLeft:"3%",
                transition:"2s",
                marginTop:"3%",
                cursor:"pointer",
                borderRadius:"25px",
                color:"wheat",
                } : 
                {
                    backgroundColor:"rgba(255,255,255,0.1)",
                    border:"none",
                    marginLeft:"3%",
                    transition:"2s",
                    marginTop:"3%",
                    cursor:"pointer",
                    borderRadius:"25px"
                    }
                } onClick={()=> {setShowAreYouSure(true)}}>logout</button>
        </div>

        <div style={{position:"absolute",width:"100%",height:"10",top:"10em",zIndex:"10"}}>
            {show ? <CloseIcon style={isDark ? {color:"wheat",transition:"2s",cursor:"pointer",marginLeft:"5%"}
                                             : {cursor:"pointer",marginLeft:"5%",transition:"2s"}} 
                                                onClick={()=> {setshow(!show)}}/> : null}
        </div>
        {show ? <ProfilePage isDark={isDark}/> : null}
        {showAreYouSure ? <AreYouSure /> : null}
        </>
    )

    }
export default LogOutSection
