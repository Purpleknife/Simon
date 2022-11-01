import React, { useEffect, useState } from 'react';

const Timer = (props) => {
  //Set timer for 4 minutes:

  const [countdown, setCountdown] = useState(240);
  const minutes = Math.floor(countdown / 60);
  const seconds = Math.floor(countdown % 60);

  useEffect(() => {
    if (props.timer === true) {
      const interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
  
      if (countdown === 0) {
        clearInterval(interval);
        props.resetGame();
        props.setShowAlert('Game Over! The 4 minutes are up.');
        props.setShow(true);
      }
  
      return () => {
        clearInterval(interval);
      }
    }
    
  });

  return (
    <div id='time'>
      {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
 
export default Timer;