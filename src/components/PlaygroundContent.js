import React, {useState} from 'react'
import "../App.css"
import Calculator from '../playground-commponents/Calculator'
import ChangeColor from '../playground-commponents/ChangeColor'
import Draw from '../playground-commponents/Draw'
import WeightTracker from '../playground-commponents/WeightTracker'
import FetchData from '../playground-commponents/FetchData'
import {useSpring,useTransition, animated } from 'react-spring';
import CalculatorIntermediate from '../playground-commponents/CalculatorIntermediate'

function PlaygroundContent({ isDark, isAtPlayground }) {
    const [color, setColor] = useState(null)
    const transition = useTransition(isAtPlayground, { 
        from:{opacity:0},
        enter:{opacity:1},
        leave:{opacity:0},
        config:{duration:1000}
    })

    return (
        transition(
            (styles,item)=> item && <animated.div style={styles}>
        <>
       <div className="playgroundContent" style={isDark ? {color:"wheat",backgroundColor:`${color}`} : {backgroundColor:`${color}`}}>
        <div className="playground-inside">
            <Calculator isDark={isDark} />
            <WeightTracker isDark={isDark} />
            <ChangeColor isDark={isDark} changeColor={color=>setColor(color)} />
            <FetchData isDark={isDark} />
        </div>
       </div>
       </> 
       </animated.div>
    ))
}

export default PlaygroundContent
