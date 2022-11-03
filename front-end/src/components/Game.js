import React, { useEffect, useState } from 'react';

import Intro from './Intro';
import Timer from './Timer';

import { eqArrays } from '../helpers/helpers';

import './Game.scss';

import Modal from 'react-bootstrap/Modal';


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
    level: 0,
    strict: false,
    gameRandomOutput: ['red', 'green', 'blue', 'yellow'],
    actualGame: ['red', 'green'],
    playerInput: [],
  });

  const [timer, setTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const [showAlert, setShowAlert] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const sounds = {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  };

  const maxLevel = 15;


  // When the game starts => is active:
  const gameIsActive = () => {
    setResetTimer(false);
    setTimer(true);
    setGame(prev => {
      return {
        ...prev, 
        active: true,
        level: prev.level + 1
      }
    });
  };



  // When the player clicks on Start:
  useEffect(() => {
    if (game.active && show === false) {
      playSequence();
    }
  }, [game.actualGame, show]);


  
  // When the player plays => clicks on the buttons:
  const playerMoves = (button) => {
    setGame(prev => ({
      ...prev,
      playerInput: [...prev.playerInput, button]
    }));
    changeStyle(button);
  };



  // To check if the player's input is correct:
  const check = () => {
    console.log('check runs');
    if (eqArrays(game.playerInput, game.actualGame) === false) {
      if (game.strict) {
        setShowAlert('It\'s strict mode. Try again from scratch.');
        setShow(true);
        resetGame();
      } else {
        setShowAlert('Wrong move. Try again.');
        setShow(true);
        goBack();
      }
    } 
    if (eqArrays(game.playerInput, game.actualGame) === true) {
      if (game.level < maxLevel) {
        setShowAlert(`Welcome to the level ${game.level + 1}.`);
        setShow(true);
        clearGame();
        setGame(prev => ({
          ...prev,
          level: game.level + 1,
          actualGame: [...game.actualGame, game.gameRandomOutput[(Math.floor(Math.random()*4))]]
        }));
      }
      if (game.level === maxLevel) {
        setShowAlert(`You won the game after ${maxLevel} levels!`);
        setShow(true);
        resetGame();
      }
    }
  };


  // Function that plays the sounds and triggers changeStyle() with an interval:
  const playSequence = () => {
    let i = 0;
    const interval = setInterval(() => {
      changeStyle(game.actualGame[i]);
      console.log(game.actualGame[i]);
      i++;
      if (i >= game.actualGame.length) {
        clearInterval(interval);
      }
    }, 600);
  };



  // check is supposed to run whenever the player finishes playing:
  useEffect(() => {
    if (game.playerInput.length === game.actualGame.length && game.actualGame.length > 0 && game.playerInput.length > 0) { //=> Means the player's turn is over.
      check();
    };
  }, [game.actualGame, game.playerInput]);



  // To proceed to the next level:
  const clearGame = () => {
    setGame(prev => {
      return {
        ...prev,
        count: 0,
        playerInput: []
      }
    });
  };



  // To reset the game:
  const resetGame = () => {
    setResetTimer(true);
    setGame(prev => {
      return {
        ...prev,
        active: false,
        level: 0,
        playerInput: [],
        actualGame: ['red', 'green'],
      }
    });
  };



  // To go back to last sequence:
  const goBack = () => {
    setGame(prev => {
      return {
        ...prev,
        playerInput: [],
        actualGame: [...prev.actualGame],
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


  return (
    <div className='container'>
      <div className='intro_game'>
        <Intro />
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>        
          {/* <Button className='close_btn' onClick={handleClose}>
            X  
          </Button> */}
        <Modal.Body className='alert'>{showAlert}</Modal.Body>
        <Modal.Footer className='footer'>
          Click anywhere on the screen to close popup.
        </Modal.Footer>
      </Modal>
      
      <div className='game'>
        <span id='level'><i className="fa-solid fa-caret-right"></i>  Level {game.level} / {maxLevel}</span>
        <Timer resetTimer={resetTimer} timer={timer} resetGame={resetGame} setShow={setShow} setShowAlert={setShowAlert}/>
        <br />
        {game.active ? <button className={style.red} onClick={() => playerMoves('red')}></button> : <button className={style.red} onClick={() => playerMoves('red')} disabled></button>}
        <div className='middle'>
          {game.active ? <button className={style.green} onClick={() => playerMoves('green')}></button> : <button className={style.green} onClick={() => playerMoves('green')} disabled></button>}

          <div className='mid'>
            <div id='count'>
              {!game.active ? <span>00</span> : <span>{game.actualGame.length < 10 ? `0${game.actualGame.length}` : game.actualGame.length}</span>}<br />
              <label>Count</label>
            </div><br />

              {!game.active ? <button onClick={() => {gameIsActive(); playSequence()}} className="start">Start</button> : <button onClick={resetGame} className="start">Reset</button>}&nbsp;&nbsp;
              <button className={style.strict} onClick={() => { 
                if (style.strict === 'strict') {
                  return chooseStrict('strict');
                }
                chooseStrict('strict-neon');
                }}>
                Strict</button>

          </div>

          {game.active ? <button className={style.blue} onClick={() => playerMoves('blue')}></button> : <button className={style.blue} onClick={() => playerMoves('blue')} disabled></button>}
        </div>
        {game.active ? <button className={style.yellow} onClick={() => playerMoves('yellow')}></button> : <button className={style.yellow} onClick={() => playerMoves('yellow')} disabled></button>}
      </div>

    </div>
  );
}
 
export default Game;