import React from 'react'

function Messages({ obj, isDark }) {

    let date = obj.date.toDate().toDateString()
    return (

        <div id = 'message-bubble'>
            <div id = 'message-info' style={isDark ? {backgroundColor:"rgba(0, 0, 0, 0.738)", color:"white"}:{}}>{obj.nickname} <br/> {date}</div>
            <div id = 'message-bubble-content' style={isDark ? {color:"white",backgroundColor:"rgba(0, 0, 0, 0.538)"}: {}}>
                {obj.message}
                
            </div>      
        </div>
    )
}

export default Messages
