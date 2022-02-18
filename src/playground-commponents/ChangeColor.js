import React, {useState} from 'react'

function ChangeColor(props) {
    const [red, setRed] = useState(null)
    const [green, setGreen] = useState(null)
    const [blue, setBlue] = useState(null)

    let color = `rgb(${red}, ${green}, ${blue})`

    return (
        <>
    <div style={{display:"flex",flexDirection:"column",width:"100%", height:"auto",justifyContent:"space-evenly",alignItems:"center"}}>
    <div style={props.isDark ? {color:"wheat",height:"100px",fontSize:"2.5vh",transition:"2s",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}
                              : {color:"black",height:"100px",fontSize:"2.5vh",transition:"2s",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}
       >Change color of parent comp
    </div>
    <div id="playground-row-div"> 
       {"Red:"}
        <input style={props.isDark ? {marginRight: "5px",color:"wheat",fontSize:"2.5vh",border:"none",borderBottom:"2px solid wheat",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"} : {fontSize:"2.5vh",border:"none",borderBottom:"2px solid black",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"}} type="number" 
               onChange={(e) => {if(e.target.value > -1 && e.target.value <= 255) {setRed(e.target.value)}else{alert("RBG values must be between 0-255! Value will be 0");setRed(0)}}} />
       {"Green:"}
        <input style={props.isDark ? {color:"wheat",fontSize:"2.5vh",border:"none",borderBottom:"2px solid wheat",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"} : {fontSize:"2.5vh",border:"none",borderBottom:"2px solid black",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"}} type="number" 
               onChange={(e) => {if(e.target.value > -1 && e.target.value <= 255) {setGreen(e.target.value)}else{alert("RBG values must be between 0-255! Value will be 0");setGreen(0)}}} />
       {"Blue:"}
        <input style={props.isDark ? {color:"wheat",fontSize:"2.5vh",border:"none",borderBottom:"2px solid wheat",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"} : {fontSize:"2.5vh",border:"none",borderBottom:"2px solid black",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"}} type="number" 
               onChange={(e) => {if(e.target.value > -1 && e.target.value <= 255) {setBlue(e.target.value)}else{alert("RBG values must be between 0-255! Value will be 0");setBlue(0)}}} />
    </div>
    <div id="playground-row-div">
        <button style={
                props.isDark ? 
                {padding:"0.5rem",cursor:"pointer",color:"wheat",width:"auto",height:"auto",border:"none",borderRadius:"20px",
                backgroundColor:"rgba(255,255,255,0.2)",fontSize:"2vh",transition:"2s"}
                :{padding:"0.5rem",cursor:"pointer",color:"black",width:"auto",height:"auto",border:"none",borderRadius:"20px", transition:"2s",backgroundColor:"rgba(255,255,255,0.2)",fontSize:"2vh",
                }}
                onClick={()=>props.changeColor(color)}
                >Apply</button>
        <button style={
                props.isDark ? 
                {padding:"0.5rem",cursor:"pointer",color:"wheat",width:"auto",height:"auto",border:"none",borderRadius:"20px",
                backgroundColor:"rgba(255,255,255,0.2)",fontSize:"2vh",transition:"2s"}
                :{padding:"0.5rem",cursor:"pointer",color:"black",width:"auto",height:"auto",border:"none",borderRadius:"20px", transition:"2s",backgroundColor:"rgba(255,255,255,0.2)",fontSize:"2vh",
                }}
                onClick={()=>props.changeColor("rgba(255, 255, 255, 0.048)")}
                
                >Reset</button>
    </div>
    </div>  
    {/* <span style={props.isDark ? {color:"wheat",height:"100px",backgroundColor:"rgb(0,0,0,0.2)",fontSize:"2.5vh",transition:"2s",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}
                              : {color:"black",height:"100px",backgroundColor:"rgb(0,0,0,0.2)",fontSize:"2.5vh",transition:"2s",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}
                              >Normally, you shouldn't be able to change state from child to parent component. But here it is xd</span> */}
    </>
    )
}

export default ChangeColor
