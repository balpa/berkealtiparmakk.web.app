import React, {useState, useEffect, memo} from 'react'
import '../App.css'
import "firebase/auth";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {doc, setDoc, onSnapshot, deleteDoc, getDocs, getDoc, collection, updateDoc, arrayRemove,arrayUnion} from "firebase/firestore"
import db from '../firebaseDB'

function WeightTracker ({isDark}) {
    const [weight, setweight] = useState(0)
    const [showRecents, setShowRecents] = useState(false)
    const [containerHeight, setContainerHeight] = useState("120px")
    const [recentWeightList, setRecentWeightList] = useState([])

    var today = new Date().toDateString();
    const loggedinUser = getAuth().currentUser;

    const addWeight = async() => {
        const loggedinUser = getAuth().currentUser;

        const currDoc = doc(db,"users",`${loggedinUser.uid}`)
        if (weight > 0 && weight < 200) {
            await updateDoc(currDoc,{
            W: arrayUnion(today+":  "+`${weight}`+" KG")
        })
        .then(()=>{alert("Added successfully!")})
        }
        else{
        alert("Please enter a valid weight!")
    }}

    const showRecentWeights = () => {
        setShowRecents(!showRecents)

    }

    const RecentWeights = () => {
        return (
            <div id="recentWeightsOpen" style={{width:"90vw",height:"auto",backgroundColor:"rgba(0,0,0,0.2)",
            display:"flex",justifyContent:"space-evenly",alignItems:"center",flexDirection:"row",fontSize:"3vh"}}>
                <span style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                    {recentWeightList != null ? recentWeightList.map((val)=> <p>{val}<br/></p>) : "No recent weights"}
                    </span>
            </div>
        )
    }

    useEffect(() => {
        const loggedinUser = getAuth().currentUser;
        if (loggedinUser != null){
         onSnapshot(doc(db, "users", `${loggedinUser.uid}`), (document) => {
             if (document.data().W != null){
            setRecentWeightList(...recentWeightList, document.data().W)
             }
             else{
                 console.log("Weight data is null or some error happened")
             }
        });}
    }, [document])

// LOGGEDIN USER ISE SECTION ACILIR -- RE-RENDER PROBLEMI ICIN BU SEKIL OLUSTURULDU COZUM ARA
    return (
        loggedinUser ? 
        <>        
        <div style={{padding:"1rem",width:"90vw",height:"auto",backgroundColor:"rgba(0,0,0,0.2)",display:"flex",justifyContent:"space-evenly",alignItems:"center",flexDirection:"column",fontSize:"3vh"}}>
    <div id="playground-column-div">
            Current Weight:
            <input style={isDark ? {fontSize:"3vh",color:"wheat",border:"none",borderBottom:"2px solid wheat",width:"3em",height:"2em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"}
                                 :{fontSize:"3vh",border:"none",borderBottom:"2px solid black",width:"3em",height:"2em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"}}
                                onChange={(e)=>{setweight(e.target.value)}}
                                defaultValue=""/>
    </div>
    <div id="playground-row-div">
            <button style={isDark ? {padding:"0.5rem",cursor:"pointer",color:"wheat",width:"auto",height:"auto",border:"none",borderRadius:"20px",backgroundColor:"rgba(255,255,255,0.2)",fontSize:"2vh",transition:"2s"}
                                  :{padding:"0.5rem",cursor:"pointer",color:"black",width:"auto",height:"auto",border:"none",borderRadius:"20px", transition:"2s",backgroundColor:"rgba(255,255,255,0.2)",fontSize:"2vh",}}
                                onClick={()=>addWeight()}>Add</button>
             <button style={isDark ? {padding:"0.5rem",cursor:"pointer",color:"wheat",width:"auto",height:"auto",border:"none",borderRadius:"20px",backgroundColor:"rgba(255,255,255,0.2)",fontSize:"2vh",transition:"2s"}
                                   :{padding:"0.5rem",cursor:"pointer",color:"black",width:"auto",height:"auto",border:"none",borderRadius:"20px", transition:"2s",backgroundColor:"rgba(255,255,255,0.2)",fontSize:"2vh",}}
                                onClick={()=>showRecentWeights()}>Recent</button>
    </div>                                
        </div>
        {showRecents ? <RecentWeights/> : null}
        </>
         : <span style={{fontSize:"3vh",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>You must be logged in to see weight tracker</span>
    )
}

export default WeightTracker
