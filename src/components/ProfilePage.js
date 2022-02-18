import React, {useState, } from 'react'
import ChangeNicknameComponent from './ChangeNicknameComponent'
import { getAuth } from "firebase/auth";

function ProfilePage({isDark, isAtProfilePage}) {

    const auth = getAuth();
    const [showNickname, setshowNickname] = useState(false)

    return (
        <div style={!isDark ? {
            position:"absolute",
            width:"70%",
            height:"60%",
            backgroundColor:"rgb(179,206,229)",
            zIndex:"10",
            left:"0",
            right:"0",
            marginLeft:"auto",
            marginRight:"auto",
            marginTop:"5em",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:"25px",
            transition:"2s",
            lineHeight:"30px",
            boxShadow: "1px 1px 120px rgb(0 0 0 / 0.815)"
        } : 
        {
            position:"absolute",
            width:"70%",
            height:"60%",
            backgroundColor: "rgba(21,34,56,0.98)",
            zIndex:"1",
            left:"0",
            right:"0",
            marginLeft:"auto",
            marginRight:"auto",
            marginTop:"5em",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:"25px",
            transition:"2s",
            lineHeight:"30px",
            boxShadow: "1px 1px 120px rgb(0 0 0 / 0.815)"
        }
        }>
        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" className="avatar" style={{
            verticalAlign:"middle",
            width:"50px",
            height:"50px",
            borderRadius:"50%",
        }}></img>
        <div id="profile-info" style={isDark ? {color:"wheat",transition:"2s"} : {transition:"2s"}}>User nickname: {auth.currentUser.displayName == null ? "null" : auth.currentUser.displayName}</div>
        <div id="profile-info" style={isDark ? {color:"wheat",transition:"2s"} : {transition:"2s"}}>User uid:</div>
        <div style={isDark ? {color:"wheat",transition:"2s",fontSize:"12px"} : {transition:"2s",fontSize:"12px"}}>{auth.currentUser.uid}</div>
        <div id="profile-info" style={isDark ? {color:"wheat",transition:"2s"} : {transition:"2s"}}>User e-mail: {auth.currentUser.email}</div>
        <button style={!isDark ? 
                {
                backgroundColor:"rgba(220, 20, 60, 0.61)",
                border:"none",
                transition:"2s",
                marginTop:"3%",
                cursor:"pointer",
                borderRadius:"25px",
                color:"black",
                }
                :
                {
                backgroundColor:"rgba(220, 20, 60, 0.61)",
                border:"none",
                transition:"2s",
                marginTop:"3%",
                cursor:"pointer",
                borderRadius:"25px",
                color:"wheat",
            }}
            onClick={()=> {setshowNickname(!showNickname)}}    >Change Nickname</button>
            {showNickname ? <ChangeNicknameComponent isDark={isDark}/> : null}

        </div>
    )
}

export default ProfilePage
