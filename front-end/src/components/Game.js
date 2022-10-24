import React from 'react';

import Intro from './Intro';

import './Game.scss';

const Game = () => {
  return (
    <div className='game'>
      <Intro />
      <button className="red"></button>
      <div className='middle'>
        <button className="green"></button>
        <button className="start">Start</button>
        <button className="blue"></button>
      </div>
      <button className="yellow"></button>
    </div>
  );
}
 
export default Game;