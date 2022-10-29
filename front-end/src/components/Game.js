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

  const [game, setGame] = useState({
    active: false,
    status: false,
    count: 0,
    level: 1,
    time: '00:00',
    strict: false,
    gameRandomOutput: ['red', 'green', 'blue', 'yellow'],
    actualGame: [],
    playerInput: [],
  });

  const sounds = {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  };


  // When the game starts => is active:
  const gameIsActive = () => {
    setGame(prev => {
      return {
        ...prev, 
        active: true, 
        actualGame: decideOutput(game.level, game.gameRandomOutput)
      }
    });
  };



  // When the player clicks on Start:
  const start = () => {    
    console.log('start runs');
    console.log('is active', game.active);

    playSequence();
    
  };

  useEffect(() => {
    if (game.active) {
      start();
    }
  }, [game.active]);

  // useEffect(() => {
  //   if (game.level > 1 && game.status) {
  //     setGame(prev => {
  //       return {
  //         ...prev,
  //         actualGame: decideOutput(game.level, game.gameRandomOutput)
  //       }
  //     });
  //   }

  // }, [game.status, clearGame]); //=> The level doesn't change the 1st time...



  // To setTimeout inside the for loop that runs in playSequence:
  const doSetTimeout = (item, index) => {
    setTimeout(() => {
      console.log(item);
      changeStyle(item);
    }, 600 * index);
  };

  
  
  // Function that plays the sounds and triggers changeStyle() with an interval:
  const playSequence = () => {
    console.log('playSequence runs');
    console.log('decideOutput', decideOutput(game.level, game.gameRandomOutput));
    console.log('level', game.level);
    console.log('playSequence actual game', game.actualGame)

    if (game.level > 1) {
      setGame(prev => ({
        ...prev,
        status: true,
        actualGame: decideOutput(game.level, game.gameRandomOutput)
      }));
    }

    for (let i = 0; i < game.actualGame.length; i++) {
      doSetTimeout(game.actualGame[i], i);
    }
  };



  // When the player plays => clicks on the buttons:
  const playerMoves = (button) => {
    changeStyle(button);
    setGame(prev => ({
      ...prev,
      count: prev.count + 1,
      playerInput: [...prev.playerInput, button]
    }));
  };



  // To check if the player's input is correct:
  const check = () => {
    console.log('check runs');
    if (eqArrays(game.playerInput, game.actualGame) === false) {
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
    if (eqArrays(game.playerInput, game.actualGame) === true) {
      if (game.level < 20) {
        console.log('check actualGame', game.actualGame);
        alert('Welcome to the next level.');
        clearGame();
        setGame(prev => ({
          ...prev,
          level: prev.level + 1,
          status: false
          //actualGame: decideOutput(game.level, game.gameRandomOutput)
        }));
        
        playSequence();
      }
      if (game.level === 20) {
        alert('You won the game after 20 levels!');
        clearGame();
      }
    }
  };



  // check is supposed to run whenever the player finishes playing:
  useEffect(() => {
    console.log('player input state', game.playerInput);
    console.log('actual game', game.actualGame);

    if (game.playerInput.length === game.actualGame.length && game.actualGame.length > 0 && game.playerInput.length > 0) { //=> Means the player's turn is over.
      check();
    };
  }, [game.playerInput, game.level, game.actualGame]);



  // To reset the game:
  const clearGame = () => {
    console.log('CLEAR GAME RUNS!!');
    setGame(prev => {
      return {
        ...prev,
        count: 0,
        playerInput: [],
        actualGame: []
      }
    });
  };



  // To play the sounds + change the buttons's CSS whenever they're clicked:
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



  // To set Strict Mode:
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
  //() => {gameIsActive(); start()}

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