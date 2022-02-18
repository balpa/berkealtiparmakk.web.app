import React, {useState} from 'react'
import {useTransition, animated } from 'react-spring';
import YouTube from 'react-youtube';

function MediaContent({isDark, isAtMedia}) {

    const opts = {
        height: '390',
        width: '80%',  
    }

    const transition = useTransition(isAtMedia, { 
        from:{opacity:0},
        enter:{opacity:1},
        leave:{opacity:0},
        config:{duration:1000}
    })

    return (
        transition(
        (styles,item)=> item && <animated.div style={styles}>
        <div className="mediaContent" style={isDark ? {color:"wheat"} : {}}>
            <div className="media-inside">
                <YouTube opts={opts} videoId="CCqgQfKusbg"/>
                <YouTube opts={opts} videoId="DJ3ik2E9IwI"/>
                <YouTube opts={opts} videoId="iLI1Tg7TL3A"/>
                <YouTube opts={opts} videoId="ZW6G-9Nb67I"/>
                <YouTube opts={opts} videoId="v-t0Zznk_Wg"/>
          </div>
        </div>
        </animated.div>
    ))
}

export default MediaContent
