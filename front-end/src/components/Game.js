import React, { useState } from 'react';

import Intro from './Intro';

import './Game.scss';

const Game = () => {
  const [style, setStyle] = useState({
    red: 'red',
    green: 'green',
    blue: 'blue',
    yellow: 'yellow',
    strict: 'strict'
  });

  const [game, setGame] = useState({
    active: false,
    level: 1,
    time: '00:00',
    count: 0,
    strict: false
  });


  const changeStyle = (condition) => {
    if (condition === 'red') {
      setStyle(
        {...style, red: 'red-neon'},
      );
      setTimeout(() => {
        setStyle(
          {...style, red: 'red'}
        );
      }, "500");
    }
    if (condition === 'green') {
      setStyle(
        {...style, green: 'green-neon'}
      );
      setTimeout(() => {
        setStyle(
          {...style, green: 'green'}
        );
      }, "500");
    }
    if (condition === 'blue') {
      setStyle(
        {...style, blue: 'blue-neon'}
      );
      setTimeout(() => {
        setStyle(
          {...style, blue: 'blue'}
        );
      }, "500");
    }
    if (condition === 'yellow') {
      setStyle(
        {...style, yellow: 'yellow-neon'}
      );
      setTimeout(() => {
        setStyle(
          {...style, yellow: 'yellow'}
        );
      }, "500");
    }
    if (condition === 'strict') {
      setStyle(
        {...style, strict: 'strict-neon'}
      );
    }
  };

  return (
    <div className='container'>
      <div className='intro_game'>
        <Intro />
      </div>
      
      <div className='game'>
        <span id='level'><i className="fa-solid fa-caret-right"></i>  Level 1 / 20</span>
        <div id='time'><span>00:00</span></div><br />
        <button className={style.red} onClick={() => changeStyle('red')}></button>
        <div className='middle'>
          <button className={style.green} onClick={() => changeStyle('green')}></button>

          <div className='mid'>
            <div id='count'>
              <span>00</span><br />
              <label>Count</label>
            </div><br />

              <button className="start">Start</button>&nbsp;&nbsp;
              <button className={style.strict} onClick={() => changeStyle('strict')}>Strict</button>

          </div>

          <button className={style.blue} onClick={() => changeStyle('blue')}></button>
        </div>
        <button className={style.yellow} onClick={() => changeStyle('yellow')}></button>
      </div>

    </div>
  );
}
 
export default Game;