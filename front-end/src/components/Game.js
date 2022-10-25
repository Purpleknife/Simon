import React from 'react';

import Intro from './Intro';

import './Game.scss';

const Game = () => {
  return (
    <div className='container'>
      <div className='intro_game'>
        <Intro />
      </div>
      
      <div className='game'>
        <span id='level'>Level 1 / 20</span>
        <div id='time'><span>12:30</span></div><br />
        <button className="red"></button>
        <div className='middle'>
          <button className="green"></button>

          <div className='mid'>
            <div id='count'>
              <span>00</span><br />
              <label>Count</label>
            </div><br />
            <button className="start">Start</button>
          </div>

          <button className="blue"></button>
        </div>
        <button className="yellow"></button>
      </div>

    </div>
  );
}
 
export default Game;