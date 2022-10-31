import React, { useState } from 'react';

const Timer = () => {
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0
  });
  
  return (
    <div id='time'>
      00:00
    </div>
  );
}
 
export default Timer;