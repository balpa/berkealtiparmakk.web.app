import React, {useState, useEffect, useLayoutEffect} from 'react'
import "../App.css"
//FB
import firebase from "firebase/compat/app";
import "firebase/auth";
import app from "../firebase";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import db from '../firebaseDB'
import {doc, setDoc, onSnapshot, deleteDoc, getDocs, getDoc, collection, updateDoc, increment, where} from "firebase/firestore"
import "firebase/firestore"
//MUI
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {useSpring,useTransition, animated } from 'react-spring';

function WCContent({isDark, isLoggedIn, isAtWC}) {

    const auth = getAuth();
    const [trigger, setTrigger] = useState(false)
    const [upvoteCount, setupvoteCount] = useState(0)
    const [downvoteCount, setdownvoteCount] = useState(0)
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [isDownVoted, setIsDownVoted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [upvotedList, setUpvotedList] = useState([])
    const [downvotedList, setDownvotedList] = useState([])

    const transition = useTransition(isAtWC, {  //          ANIMASYON
        from:{opacity:0},
        enter:{opacity:1},
        leave:{opacity:0},
        config:{duration:1000}
    })

    useEffect(async() => {
        const loggedinUser = getAuth().currentUser;
        if (loggedinUser != null){
            const querySnapshot = await getDocs(collection(db,"upvote"))
            querySnapshot.forEach((doc) => {
                setUpvotedList(prevList =>[...prevList, doc.data().DISPLAYNAME])
            })}
    }, []) 

    useEffect(async() => {
        const loggedinUser = getAuth().currentUser;
        if (loggedinUser != null){
            const querySnapshot = await getDocs(collection(db,"downvote"))
            querySnapshot.forEach((doc) => {
                setDownvotedList(prevList => [...prevList, doc.data().DISPLAYNAME])
            })}
    }, [])   

    console.log(upvotedList)

    const VoteComponents = () => {
        return (
            <>
             <div id="vote-component">
                <span id="dont-forget-span" style={{textAlign:"center",fontSize:"3rem",marginBottom:"2rem"}}>Don't forget to vote!</span>
                <ThumbUpIcon sx={ isDark ? {color:"wheat",transform:"scale(2)",transition:"2s",cursor:"pointer"} :
                                                 {color:"black",transform:"scale(2)",transition:"2s",cursor:"pointer"}} onClick={()=>upvoteFunc()} /> 
                <span style={{fontSize:"0.7em",paddingBottom:"1rem",paddingTop:"2rem"}}>{ isLoading ? "..." : upvoteCount }</span>

                <ThumbDownIcon sx={ isDark ? {color:"wheat",transform:"scale(2)",transition:"2s",cursor:"pointer"} : 
                                                   {color:"black",transform:"scale(2)",transition:"2s",cursor:"pointer"}} onClick={()=>downvoteFunc()}/>
                <span style={{marginTop:"0.1rem"}}>
                <KeyboardArrowDownIcon sx={ isDark ? {color:"wheat",transform:"scale(2)",transition:"2s"} : 
                                                   {color:"black",transform:"scale(2)",transition:"2s"}} />
                </span>
            </div>
            <div id="votedusernames">
                    <div id="votedusernames-names">
                        <h2 id="h2-voted">Upvoted Users</h2>
                        {upvotedList != null ? upvotedList.map((val)=> <p id="votedusernames-names">{val}<br/></p>) : null}
                    </div>
                    <div id="votedusernames-names">
                        <h2 id="h2-voted">Downvoted Users</h2>
                        {downvotedList != null ? downvotedList.map((val)=> <p id="votedusernames-names">{val}<br/></p>) : null}
                    </div>
                </div> 
            </>
        )
    }


    const upvoteFunc = async () => {  // UPTOVE FUNC
        const loggedinUser = getAuth().currentUser;
        const upvotecounts = await getDoc(doc(db, "upvote", `${loggedinUser.uid}`))
        const downvotecounts = await getDoc(doc(db, "downvote", `${loggedinUser.uid}`))
        setTrigger(!trigger)

    if(upvotecounts.exists() === false && downvotecounts.exists() === false){
         await setDoc(doc(db,"upvote",`${loggedinUser.uid}`), {
            EMAIL: loggedinUser.email,
            VOTE: "upvote",
            DISPLAYNAME: loggedinUser.displayName
        })
        .then(
            await updateDoc(doc(db,"votecount","upvotecount"),{
                upvotecount: increment(1)
            })
        )
    }
    else if(downvotecounts.exists() === true && upvotecounts.exists() === false){
        await setDoc(doc(db,"upvote",`${loggedinUser.uid}`), {
            EMAIL: loggedinUser.email,
            VOTE: "upvote",
            DISPLAYNAME: loggedinUser.displayName
        })
        .then(                 // UPVOTE'A EKLEDIKTEN SONRA DOWNVOTE'DAN SİLER
            await deleteDoc(doc(db, "downvote", `${loggedinUser.uid}`))
        )
        .then(
            await updateDoc(doc(db,"votecount","upvotecount"),{
                upvotecount: increment(2)
            })
        )
    }
    else{alert("You already upvoted!")}

}

    const downvoteFunc = async() => {        // DOWNVOTE FUNCs
        const loggedinUser = getAuth().currentUser;
        const downvotecounts = await getDoc(doc(db, "downvote", `${loggedinUser.uid}`))
        const upvotecounts = await getDoc(doc(db, "upvote", `${loggedinUser.uid}`))
        setTrigger(!trigger)

    if(downvotecounts.exists() === false && upvotecounts.exists() === false){
         await setDoc(doc(db,"downvote",`${loggedinUser.uid}`), {
            EMAIL: loggedinUser.email,
            VOTE: "downvote",
            DISPLAYNAME: loggedinUser.displayName
        }
        )
        .then(
            await updateDoc(doc(db,"votecount","upvotecount"),{
                upvotecount: increment(-1)
            })
        )
    }
    else if(upvotecounts.exists() === true && downvotecounts.exists() === false){
        await setDoc(doc(db,"downvote",`${loggedinUser.uid}`), {
            EMAIL: loggedinUser.email,
            VOTE: "downvote",
            DISPLAYNAME: loggedinUser.displayName
        })
        .then(                 // UPVOTE'A EKLEDIKTEN SONRA DOWNVOTE'DAN SİLER
            await deleteDoc(doc(db, "upvote", `${loggedinUser.uid}`))
        )
        .then(
            await updateDoc(doc(db,"votecount","upvotecount"),{
                upvotecount: increment(-2)
            })
        )
    }
    else{alert("You already downvoted!")}

}

    useEffect(() => {                   // COUNT GELENE KADAR LOADING YAZAR
        if (upvoteCount == 0){
            setIsLoading(true)
        }
        else{
            setIsLoading(false)
        }
    },[upvoteCount])

    useEffect(async () => {      // UPVOTE KONTROLU
        const loggedinUser = getAuth().currentUser;
        if (loggedinUser != null){
        const upvotecounts =  await getDoc(doc(db, "upvote", `${loggedinUser.uid}`))
        if (upvotecounts.exists() && isUpvoted === true){

            await updateDoc(doc(db,"votecount","upvotecount"),{
                upvotecount: increment(1)
            });console.log("upvote çalıştı")}
        }
    }, [trigger])

    useEffect(async() => {      // DOWNVOTE KONTROLU
        const loggedinUser = getAuth().currentUser;
        if (loggedinUser != null){
        const downvotecounts =  await getDoc(doc(db, "downvote", `${loggedinUser.uid}`))

        if(downvotecounts.exists() && isDownVoted === true){

            await updateDoc(doc(db,"votecount","upvotecount"),{
                upvotecount: increment(-1)
            });console.log("downvote çalıştı")
        }}
    }, [trigger])
    
    
    useEffect(() => {      // DB'DE UPVOTE VE DOWNVOTE SAYILARI

        onSnapshot(doc(db, "votecount", "upvotecount"), (document) => {
            setupvoteCount(document.data().upvotecount)
            // console.log("upvote count on db: "+document.data().upvotecount)
        })
        onSnapshot(doc(db, "votecount", "downvotecount"), (document) => {
            setdownvoteCount(document.data().downvotecount)
            // console.log("downvote count on db: "+document.data().downvotecount)
        })

    }, [document])


    return (
        transition(
            (styles,item)=> item && <animated.div style={styles}>
        <div className="wcContent" style={isDark ? {color:"wheat", display:"flex",flexDirection:"column"} : {display:"flex",flexDirection:"column"}}>
            <div id="wc-inside">
                {isLoggedIn===false ? <span style={{fontSize:"20px",position:'absolute',top:'50%',left:'50%',transform:"translate(-50%,-50%)"}}>You must be logged in to vote</span> : <VoteComponents />}
            </div>
        </div>
        </animated.div>
        )
    )
}

export default WCContent
