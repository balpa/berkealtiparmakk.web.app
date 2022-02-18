import React, {useState} from 'react'
import { getAuth, updateProfile } from 'firebase/auth';


function ChangeNicknameComponent({isDark}) {
    const [nickname, setNickname] = useState('')
    const auth = getAuth()

    const setNicknameFunc = () => {   // nickname limitasyonları ayarla

      if(nickname.length < 3 || nickname.length > 20){
        alert("Nickname must be between 3 and 20 characters")
      }
      else{
        updateProfile(auth.currentUser, {
            displayName: `${nickname}`
          }).then(() => {
            alert('Nickname changed successfully!')
          }).catch((error) => {
            alert(error.message)
          });
    }}
 
    return (
        <div style={ isDark ?
            {width:"50%",
            height:"20%",
            backgroundColor:"rgba(220, 20, 60, 0.61)",
            transition:"2s",
            marginTop:"1em",
            borderRadius:"25px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            } 
            :
            {width:"50%",
            height:"20%",
            backgroundColor:"rgba(220, 20, 60, 0.61)",
            transition:"2s",
            marginTop:"1em",
            borderRadius:"25px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",}}>
            <input type="text" onChange={e => setNickname(e.target.value)}></input>
            <button style={!isDark ? 
                {
                backgroundColor:"white",
                border:"none",
                transition:"2s",
                cursor:"pointer",
                borderRadius:"25px",
                color:"black",
                marginTop:"1em",
                }
                :
                {
                backgroundColor:"black",
                border:"none",
                transition:"2s",
                cursor:"pointer",
                borderRadius:"25px",
                color:"wheat",
                marginTop:"1em",
            }}
            onClick={() => {setNicknameFunc()}}
            >Save</button>

        </div>
    )
}

export default ChangeNicknameComponent
