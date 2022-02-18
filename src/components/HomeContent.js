import React from 'react'
import '../App.css'
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import db from '../firebaseDB'
import { useSpring,useTransition, animated } from 'react-spring';
import { listItemAvatarClasses } from '@mui/material';
import Messages from './Messages';

function HomeContent({isDark, isAtHome}) {

    const [message, setMessage] = React.useState('');

    const auth = getAuth();

    const transition = useTransition(isAtHome, { 
        from:{opacity:0},
        enter:{opacity:1},
        leave:{opacity:0},
        config:{duration:1000}
    })

    const sendMessage = async () => {
        let date = new Date();
        let currentuseruid = auth.currentUser.uid;

        if (message.length < 1){
            alert('Please enter a message');
        }
        else{
        await setDoc(doc(db, "messages", `${currentuseruid}`), {
            message: message,
            date: date,
            nickname: auth.currentUser.displayName,
      });}
    }

    React.useEffect(() => {

    },[])

    return (
        transition(
        (styles,item)=> item && <animated.div style={styles}>
        <div className="homeContent" style={isDark ? {color:"wheat"} : {}}>
            <div className="home-inside">
                HELLÖ{auth.currentUser&&auth.displayName!=null ? "," : ""}<br />
                {auth.currentUser && auth.displayName === null ? "Please set a nick" : ""}
                {auth.currentUser ? auth.currentUser.displayName : "Please Login"}
                <div className="home-inside-notes">
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                </div>
                <div className='message-input'>
                    <input id='message' type="text" onChange={e=> setMessage(e.target.value)} maxLength='160' placeholder="Leave a message..."/>
                    <button className='send-message-button' onClick={()=> sendMessage()}>Send</button>
                </div>
            </div>
          
        </div>
        </animated.div>
    ))
}  

export default HomeContent
