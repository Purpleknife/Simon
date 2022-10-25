import React, { useState } from 'react';

import Intro from './Intro';

import './Game.scss';

const Game = () => {
  const [redStyle, setRedStyle] = useState('red');
  const [greenStyle, setGreenStyle] = useState('green');
  const [blueStyle, setBlueStyle] = useState('blue');
  const [yellowStyle, setYellowStyle] = useState('yellow');

  const changeStyle = (condition) => {
    if (condition === 'red') {
      setRedStyle('red-neon');
      setTimeout(() => {
        setRedStyle('red');
      }, "700");
    }
    if (condition === 'green') {
      setGreenStyle('green-neon');
      setTimeout(() => {
        setGreenStyle('green');
      }, "700");
    }
    if (condition === 'blue') {
      setBlueStyle('blue-neon');
      setTimeout(() => {
        setBlueStyle('blue');
      }, "700");
    }
    if (condition === 'yellow') {
      setYellowStyle('yellow-neon');
      setTimeout(() => {
        setYellowStyle('yellow');
      }, "700");
    }
  };

  return (
    <div className='container'>
      <div className='intro_game'>
        <Intro />
      </div>
      
      <div className='game'>
        <span id='level'>Level 1 / 20</span>
        <div id='time'><span>12:30</span></div><br />
        <button className={redStyle} onClick={() => changeStyle('red')}></button>
        <div className='middle'>
          <button className={greenStyle} onClick={() => changeStyle('green')}></button>

          <div className='mid'>
            <div id='count'>
              <span>00</span><br />
              <label>Count</label>
            </div><br />
            <button className="start">Start</button>
          </div>

          <button className={blueStyle} onClick={() => changeStyle('blue')}></button>
        </div>
        <button className={yellowStyle} onClick={() => changeStyle('yellow')}></button>
      </div>

    </div>
  );
}
 
export default Game;