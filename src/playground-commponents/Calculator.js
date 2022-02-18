import { calculateBackoffMillis } from '@firebase/util'
import React, {useState} from 'react'


function Calculator({isDark}) {
    const [firstNum, setfirstNum] = useState(null)
    const [secondNum, setsecondNum] = useState(null)
    const [final, setfinal] = useState(null)
    const [selected, setselected] = useState("multiply")
    const [show, setShow] = useState(false)

    const multiply = () => {
        setfinal(firstNum * secondNum)
    }
    const divide = () => {
        setfinal(firstNum / secondNum)
    }
    const add = () => {
        setfinal(parseInt(firstNum) + parseInt(secondNum))
    }
    const subtract = () => {
        setfinal(firstNum - secondNum)
    }

    const calculate = () => {
        setShow(true)

        if (selected === "multiply") {
            multiply();
        } else if (selected === "divide") {
            divide()
        } else if (selected === "add") {
            add()
        } else if (selected === "subtract") {
            subtract()
        }
    }

    const keyboardEnter = (e) => {
        if (e.key === "Enter") {
            calculate()
        }
        else{}  

    }

    return (
        <>
        <div style={{display:"flex",flexDirection:"row",width:"100%", height:"auto",justifyContent:"space-evenly",alignItems:"center"}}>
        <div id="playground-column-div" >
            <h2 style={isDark ? {fontSize:"25px", color:"wheat",transition:"2s"}:{fontSize:"25px"}}> Calculator: </h2>
        <div id="playground-row-div">
            <input style={isDark ? {fontSize:"3vh",border:"none",borderBottom:"2px solid wheat",color:"wheat",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"} : {fontSize:"3vh",border:"none",borderBottom:"2px solid black",color:"black",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"}} type="number" onChange={(e) => setfirstNum(e.target.value)} onKeyPress={keyboardEnter} />
            <select style={isDark ? {fontSize:"3vh",border:"none",borderBottom:"2px solid wheat",color:"wheat",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"} : {fontSize:"3vh",border:"none",borderBottom:"2px solid black",color:"black",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"}} value={selected} onChange={(e)=> setselected(e.target.value)} id="calculator">
                <option value="multiply">*</option>
                <option value="add">+</option>
                <option value="divide">/</option>
                <option value="subtract">-</option>
            </select>
            <input style={isDark ? {fontSize:"3vh",border:"none",borderBottom:"2px solid wheat",color:"wheat",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"} : {fontSize:"3vh",border:"none",borderBottom:"2px solid black",color:"black",width:"3em", backgroundColor:"rgba(0,0,0,0)",transition:"2s"}} type="number" onChange={(e) => setsecondNum(e.target.value)} onKeyPress={keyboardEnter}/>
        </div>    
            <button style={isDark ? {cursor:"pointer",fontSize:"2rem",border:"none",color:"wheat", backgroundColor:"rgba(0,0,0,0)",transition:"2s"}:{cursor:"pointer",fontSize:"2rem",border:"none",color:"black", backgroundColor:"rgba(0,0,0,0)",transition:"2s"}} onClick={()=> calculate()}>=</button>
        </div>
        </div>
        {show ? <div style={isDark? {marginBottom:"1.5rem",color:"wheat",fontSize:"4vh",width:"100%",height:"50px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",transition:"2s"}
                          : {marginBottom:"1.5rem",fontSize:"4vh",width:"100%",height:"50px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                            {final !== null ? final : null}</div> : null}
        </>
    )
}

export default Calculator
