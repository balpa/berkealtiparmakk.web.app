import React from 'react'
import '../App.css'
import { getAuth } from "firebase/auth";
import { doc, setDoc, onSnapshot, getDocs, collection } from "firebase/firestore"; 
import db from '../firebaseDB'
import { useSpring,useTransition, animated } from 'react-spring';
import { listItemAvatarClasses } from '@mui/material';
import Messages from './Messages';

function HomeContent({isDark, isAtHome}) {

    const [message, setMessage] = React.useState('');
    const [messageArray, setMessageArray] = React.useState([]);
    const [trigger, setTrigger] = React.useState(0);

    const auth = getAuth();

    const transition = useTransition(isAtHome, { 
        from:{opacity:0},
        enter:{opacity:1},
        leave:{opacity:0},
        config:{duration:1000}
    })

    const sendMessage = async () => {
        setTrigger(trigger+1);

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

 

    React.useEffect(async () => {
        const querySnapshot = await getDocs(collection(db, "messages"));
            querySnapshot.forEach((doc) => {
             let message = {
                message: doc.data().message,
                date: doc.data().date,
                nickname: doc.data().nickname,
             }
            setMessageArray(messageArray => [...messageArray, message]);
});
    },[])

    console.log(messageArray);



    return (
        transition(
        (styles,item)=> item && <animated.div style={styles}>
        <div className="homeContent" style={isDark ? {color:"wheat"} : {}}>
            <div className="home-inside">
                HELLÖ{auth.currentUser&&auth.displayName!=null ? "," : ""}<br />
                {auth.currentUser && auth.displayName === null ? "Please set a nick" : ""}
                {auth.currentUser ? auth.currentUser.displayName : "Please Login To See Notes"}

                <div className="home-inside-notes-bg"></div>
                <div className="home-inside-notes">
                {messageArray.map((val)=> <Messages obj={val} isDark={isDark}/>)}
                    
                </div>
                <div className='message-input'>
                    <input id='message' type="text" onChange={e=> setMessage(e.target.value)} maxLength='160' placeholder="Leave a note..."/>
                    <button className='send-message-button' onClick={()=> sendMessage()}>Send</button>
                </div>
            </div>
          
        </div>
        </animated.div>
    ))
}  

export default HomeContent
