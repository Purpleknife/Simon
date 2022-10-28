import React, { useEffect, useState } from 'react';

import Intro from './Intro';

import { decideOutput, eqArrays } from '../helpers/helpers';

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

  //const [level, setLevel] = useState(1);
  //const [count, setCount] = useState(0);
  // const [status, setStatus] = useState(false);
  // const [playerTurnOver, setPlayerTurnOver] = useState(false);
  // const [isActive, setIsActive] = useState(false);
  const [playerInput, setPlayerInput] = useState([]);

  const [game, setGame] = useState({
    active: false,
    count: 0,
    level: 1,
    time: '00:00',
    strict: false,
    gameRandomOutput: ['red', 'green', 'blue', 'yellow'],
    actualGame: []
  });

  const gameIsActive = () => {
    setGame(prev => ({
      ...prev,
      active: true,
      actualGame: decideOutput(game.level, game.gameRandomOutput)
    }));
  }


  const start = () => {
    
    console.log('start runs');
    //setIsActive(true);
    console.log('is active', game.active);

    playSequence();
    
  };
  useEffect(() => {
    if (game.active) {
      start();
    }
    
  }, [game.active]);


  const check = () => {
    console.log('check runs');
    if (eqArrays(playerInput, game.actualGame) === false) {
      if (game.strict) {
        alert('Its strict mode. Try again from scratch');
        clearGame();
        //setLevel(1);
        playSequence();
      } else {
        alert('Wrong move. Try again.');
        clearGame();
        playSequence();
      }
    } 
    if (eqArrays(playerInput, game.actualGame) === true) {
      if (game.level < 20) {
        console.log('check actualGame', game.actualGame);
        alert('Welcome to the next level.');
        clearGame();
        setGame(prev => ({
          ...prev,
          level: prev.level + 1
        }));
        //gameIsActive();
        playSequence();
      }
      if (game.level === 20) {
        alert('You won the game after 20 levels!');
        clearGame();
      }
    }
  };


  //To reset the game:
  const clearGame = () => {
    console.log('CLEAR GAME RUNS!!');
    setGame(prev => ({
      ...prev,
      count: 0,
      actualGame: decideOutput(game.level, game.gameRandomOutput)
    }));
    setPlayerInput([]);
  };

  
  //Function that plays the sounds and triggers changeStyle() with an interval:
  const playSequence = () => {
    console.log('playSequence runs');
    console.log('decideOutput', decideOutput(game.level, game.gameRandomOutput));
    console.log('level', game.level);
    console.log('playSequence actual game', game.actualGame)
    
    const doSetTimeout = (item, index) => {
      setTimeout(() => {
        console.log(item);
        changeStyle(item);
      }, 600 * index);
    }
        
    let newArr = game.actualGame;
    for (let i = 0; i < newArr.length; i++) {
      doSetTimeout(newArr[i], i);
      // setTimeout(() => {
      //   console.log(newArr[i]);
      //   changeStyle(newArr[i]);
      // }, 600 * i);
    }

  };

  // const doSetTimeout = (arr) => {
  //   let i = 0;
  //   const interval = setInterval(() => {
  //     changeStyle(arr[i]);
  //     i++;
  //     if (i >= arr.length) {
  //       clearInterval(interval);
  //     }
  //   }, 1000 * i)
  //  }



  const playerMoves = (button) => {
    changeStyle(button);
    setGame(prev => ({
      ...prev,
      count: prev.count + 1,
      //actualGame: []
    }));

    setPlayerInput(prev => [...prev, button]);
    
  };


  useEffect(() => {
    console.log('player input state', playerInput);
    //console.log('actual game', game.actualGame);

    if (playerInput.length === game.actualGame.length && game.actualGame.length > 0 && playerInput.length > 0) { //=> Means the player's turn is over.
      check();
    };
  }, [playerInput, game.actualGame]);
  


  const changeStyle = (condition) => {
    if (condition === 'red') {
      setStyle(prev => ({
        ...prev, 
        red: 'red-neon'})
      );
    sounds.red.play();

    setTimeout(() => {
      setStyle(prev => ({
        ...prev,
        red: 'red',
      }));
    }, "300");
    }

    if (condition === 'green') {
      setStyle(prev => ({
        ...prev, 
        green: 'green-neon'})
      );
    sounds.green.play();

    setTimeout(() => {
      setStyle(prev => ({
        ...prev, 
        green: 'green'})
      );
    }, "300");
    }

    if (condition === 'blue') {
      setStyle(prev => ({
        ...prev, 
        blue: 'blue-neon'})
      );
    sounds.blue.play();

    setTimeout(() => {
      setStyle(prev => ({
        ...prev, 
        blue: 'blue'})
      );
    }, "300");
    }

    if (condition === 'yellow') {
      setStyle(prev => ({
        ...prev, 
        yellow: 'yellow-neon'})
      );
    sounds.yellow.play();

    setTimeout(() => {
      setStyle(prev => ({
        ...prev, 
        yellow: 'yellow'})
      );
    }, "300");
    }

    
  };

  const chooseStrict = (condition) => {
    if (condition === 'strict') {
      setStyle(prev => ({
        ...prev,
        strict: 'strict-neon'
      }));
      setGame(prev => ({
        ...prev,
        strict: true
      }));
    }
    if (condition === 'strict-neon') {
      setStyle(prev => ({
        ...prev,
        strict: 'strict'
      }));
      setGame(prev => ({
        ...prev,
        strict: false
      }));
    }
  };

  
  // () => {gameIsActive(); start()}
  return (
    <div className='container'>
      <div className='intro_game'>
        <Intro />
      </div>
      
      <div className='game'>
        <span id='level'><i className="fa-solid fa-caret-right"></i>  Level {game.level} / 20</span>
        <div id='time'><span>00:00</span></div><br />
        <button className={style.red} onClick={() => playerMoves('red')}></button>
        <div className='middle'>
          <button className={style.green} onClick={() => playerMoves('green')}></button>

          <div className='mid'>
            <div id='count'>
              <span>{game.count < 10 ? `0${game.count}` : game.count}</span><br />
              <label>Count</label>
            </div><br />

              <button onClick={() => {gameIsActive(); start()}} className="start">Start</button>&nbsp;&nbsp;
              <button className={style.strict} onClick={() => { 
                if (style.strict === 'strict') {
                  return chooseStrict('strict');
                }
                chooseStrict('strict-neon');
                }}>
                Strict</button>

          </div>

          <button className={style.blue} onClick={() => playerMoves('blue')}></button>
        </div>
        <button className={style.yellow} onClick={() => playerMoves('yellow')}></button>
      </div>

    </div>
  );
}
 
export default Game;