import React, { useState } from 'react';

import Login from './Login';
import Register from './Register';

import './Intro.scss';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Intro = () => {
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='intro'>
      <p>Simon Game</p>
        <div className='info'>
        <Button className='instructions' onClick={handleShow}>
          Instructions
        </Button>&nbsp;
        
        <Button className='login_register' onClick={handleLoginShow}>
          Login
        </Button>
        <Login handleClose={handleLoginClose} show={showLogin}/>&nbsp;

        <Button className='login_register' onClick={handleRegisterShow}>
          Register
        </Button>
        <Register handleClose={handleRegisterClose} show={showRegister}/>

      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          - Each button (red, green, blue and yellow) has its own distinct sound.<br />
          - For each level, the game will play a unique sequence of sounds with their respective buttons lightning up.<br />
          - After hearing the sequence, you are supposed to repeat it.<br />
          - The game is over if you fail to repeat the same sequence.<br /><br />
          - <strong>Strict mode:</strong> restarts the game whenever you select the wrong field in a pattern.<br />
          - <strong>Normal mode:</strong> repeats the pattern subsequent of the wrong button being pressed.
          <br /><br />
          <span id='fun'>Have fun!</span>
        </Modal.Body>
        <Modal.Footer>
          <Button className='close' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
 
export default Intro;