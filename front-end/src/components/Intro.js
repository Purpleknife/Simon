import React, { useState } from 'react';

import './Intro.scss';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Intro = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='intro'>
      <p>Simon Game</p>
        <div className='info'>
        <Button className='instructions' onClick={handleShow}>
          Instructions
        </Button>&nbsp;
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          - Each button (red, green, blue and yellow) has its own distinct sound.<br />
          - For each level, the game will play a unique sequence of sounds with their respective buttons lightning up.<br />
          - After hearing the sequence, you are supposed to repeat it.<br />
          - The game is over if you fail to complete the 15 levels in 4 minutes.<br />
          - There are 2 modes:<br />
          <strong>Strict mode:</strong> restarts the game whenever you select the wrong field in a pattern.<br />
          <strong>Normal mode:</strong> repeats the pattern subsequent of the wrong button being pressed. It's the default mode.
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