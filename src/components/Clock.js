import React, { useState, useEffect } from 'react';

function Clock({ isDark }){
  const [date, setDate] = useState(new Date());
  
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {

    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <span style={{zIndex:"1"}}>
      {date.toLocaleTimeString()}
    </span>
  );
}
export default Clock;