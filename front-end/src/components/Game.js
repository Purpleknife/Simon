import React, { useEffect, useState } from 'react';

import Intro from './Intro';

import { shuffle, eqArrays } from '../helpers/helpers';

import './Game.scss';

const Game = () => {
  const [style, setStyle] = useState({
    red: 'red',
    green: 'green',
    blue: 'blue',
    yellow: 'yellow',
    strict: 'strict'
  });

  const sounds = {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  };

  const [level, setLevel] = useState(0);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [playerTurnOver, setPlayerTurnOver] = useState(false);

  const [game, setGame] = useState({
    active: false,
    time: '00:00',
    strict: false,
    gameRandomOutput: ['red', 'green', 'blue', 'yellow'],
    actualGame: []
  });


  const start = () => {
    setGame({
      ...game, 
      actualGame: shuffle(game.gameRandomOutput)
    });
    
    
    playSequence(game.actualGame);

    console.log('sequence should be TRUE', status);

    console.log('strict', game.strict);

    // setTimeout(() => {
    //   setPlayerTurnOver(true);
    // }, '3500');

    // if (playerTurnOver === true) { //=> Means the player's turn is over.
    //   check();
    // };
    
    
  };


  useEffect(() => {
    start();
  }, []);

  // const check = () => {
  //   //setTimeout(() => {
  //     if (!eqArrays(game.playerInput, game.actualGame)) {
  //       if (game.strict) {
  //         alert('Its strict mode. Try again from scratch');
  //         clearGame();
  //       } else {
  //         alert('Wrong move. Try again.');
  //         playSequence(game.actualGame);
  //       }
  //     } else {
  //       if (level < 20) {
  //         alert('Welcome to the next level.');
  //         playSequence(game.actualGame);
  //       }
  //       if (level === 20) {
  //         alert('You won the game after 20 levels!');
  //         clearGame();
  //       }
  //     }
  //   //}, '3600');
  // }


  
  //Function that plays the sounds and triggers changeStyle() with an interval:
  const playSequence = (arr) => {
    setLevel(prev => prev + 1);
    for (let i = 0; i < arr.length; i++) {
      if (i < arr.length){
        setTimeout(() => {
          console.log(arr[i]);
          changeStyle(arr[i]);
        }, 600 * i);
      }
      setStatus(true); //=> Means it's the player's turn.
    }
   
  };

  const [playerInput, setPlayerInput] = useState([]);

  const playerMoves = (button) => {
    setCount(prev => prev + 1);
    setPlayerInput(prev => [...prev, button]);

  };

  //console.log('player Input OUTSIDE', playerInput);

  useEffect(() => {
    console.log('player input state', playerInput);
  }, [playerInput]);
  
  const clearGame = () => {
    setGame({
      ...game, 
      actualGame: [],
      playerInput: []
    });
    setCount(0);
    //setStatus(false);
  }


  const changeStyle = (condition) => {
    if (condition === 'red') {
      setStyle(
        {...style, red: 'red-neon'},
      );
    sounds.red.play();
    
    if (status === true) { //=> When the sequence stops and it's the player's turn.
      playerMoves(condition);
    }

    setTimeout(() => {
      setStyle(
        {...style, red: 'red'}
      );
    }, "300");
    }

    if (condition === 'green') {
      setStyle(
        {...style, green: 'green-neon'}
      );
    sounds.green.play();

    if (status === true) { //=> When the sequence stops and it's the player's turn.
      playerMoves(condition);
    }

    setTimeout(() => {
      setStyle(
        {...style, green: 'green'}
      );
    }, "300");
    }

    if (condition === 'blue') {
      setStyle(
        {...style, blue: 'blue-neon'}
      );
    sounds.blue.play();

    if (status === true) { //=> When the sequence stops and it's the player's turn.
      playerMoves(condition);
    }

    setTimeout(() => {
      setStyle(
        {...style, blue: 'blue'}
      );
    }, "300");
    }

    if (condition === 'yellow') {
      setStyle(
        {...style, yellow: 'yellow-neon'}
      );
    sounds.yellow.play();

    if (status === true) { //=> When the sequence stops and it's the player's turn.
      playerMoves(condition);
    }

    setTimeout(() => {
      setStyle(
        {...style, yellow: 'yellow'}
      );
    }, "300");
    }

    
  };

  const chooseStrict = (condition) => {
    if (condition === 'strict') {
      setStyle(
        {...style, strict: 'strict-neon'}
      );
      setGame({
        ...game,
        strict: true
      });
    }
    if (condition === 'strict-neon') {
      setStyle(
        {...style, strict: 'strict'}
      );
      setGame({
        ...game,
        strict: false
      });
    }
  }

  return (
    <div className='container'>
      <div className='intro_game'>
        <Intro />
      </div>
      
      <div className='game'>
        <span id='level'><i className="fa-solid fa-caret-right"></i>  Level {level} / 20</span>
        <div id='time'><span>00:00</span></div><br />
        <button className={style.red} onClick={() => changeStyle('red')}></button>
        <div className='middle'>
          <button className={style.green} onClick={() => changeStyle('green')}></button>

          <div className='mid'>
            <div id='count'>
              <span>{count < 10 ? `0${count}` : count}</span><br />
              <label>Count</label>
            </div><br />

              <button onClick={start} className="start">Start</button>&nbsp;&nbsp;
              <button className={style.strict} onClick={() => { 
                if (style.strict === 'strict') {
                  return chooseStrict('strict');
                }
                chooseStrict('strict-neon');
                }}>
                Strict</button>

          </div>

          <button className={style.blue} onClick={() => changeStyle('blue')}></button>
        </div>
        <button className={style.yellow} onClick={() => changeStyle('yellow')}></button>
      </div>

    </div>
  );
}
 
export default Game;