import React from 'react'
import CanvasDraw, {clear} from 'react-canvas-draw'

function Draw({ isDark, scroll }) {
    let saveableCanvas

    if (scroll === true){  
        // ???????
    }

    return (
        <CanvasDraw 
        hideGrid={true}
        brushRadius={5}
        style={{
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
          width:"100%",
          height:"50%",
          overflow:"hidden",
          borderRadius:"25px",
        }}
      />
    )
}

export default Draw
