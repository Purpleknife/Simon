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

  const [level, setLevel] = useState(1);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [playerTurnOver, setPlayerTurnOver] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [game, setGame] = useState({
    active: false,
    time: '00:00',
    strict: false,
    gameRandomOutput: ['red', 'green', 'blue', 'yellow'],
    actualGame: []
  });

  const gameIsActive = () => {
    setIsActive(true);
  }


  const start = () => {
    console.log('start runs');
    setGame({
      ...game, 
      actualGame: shuffle(game.gameRandomOutput)
    });
    
    console.log('is active', game.active);

    playSequence(game.actualGame);
    
  };


  useEffect(() => {
    if (isActive) {
      start();
    }
    console.log('actual game', game.actualGame);
  }, [isActive]);

  const check = () => {
    console.log('check runs');
    if (eqArrays(playerInput, game.actualGame) === false) {
      if (game.strict) {
        alert('Its strict mode. Try again from scratch');
        clearGame();
      } else {
        alert('Wrong move. Try again.');
        playSequence(game.actualGame);
      }
    } 
    if (eqArrays(playerInput, game.actualGame) === true) {
      if (level < 20) {
        alert('Welcome to the next level.');
        setLevel(prev => prev + 1);
        clearGame();
        playSequence(game.actualGame);
      }
      if (level === 20) {
        alert('You won the game after 20 levels!');
        clearGame();
      }
    }
  }


  
  //Function that plays the sounds and triggers changeStyle() with an interval:
  const playSequence = (arr) => {
    console.log('playSequence runs');
    
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


  useEffect(() => {
    console.log('player input state', playerInput);
    console.log('status', status);
    //console.log('playerTurnOver', playerTurnOver);
    if (playerInput.length === game.actualGame.length && game.actualGame.length > 0 && playerInput.length > 0) { //=> Means the player's turn is over.
      check();
    };
  }, [playerInput]);
  

  //To reset the game:
  const clearGame = () => {
    setStatus(false); // => DOESN'T WORK !!
    console.log('CLEAR GAME RUNS!!');
    setGame({
      ...game, 
      actualGame: []
    });
    setPlayerInput([]);
    setCount(0);
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

              <button onClick={() => {start(); gameIsActive()}} className="start">Start</button>&nbsp;&nbsp;
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