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
        <button className="red"></button>
        <div className='middle'>
          <button className="green"></button>
          <button className="start">Start</button>
          <button className="blue"></button>
        </div>
        <button className="yellow"></button>
      </div>

    </div>
  );
}
 
export default Game;