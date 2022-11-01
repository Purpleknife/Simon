import React, { useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import './Login.scss';


const Login = (props) => {
  const emailInput = useRef();
  const passwordInput = useRef();

  return (
    <>
    <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='login-title'>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                name='email'
                autoFocus
                placeholder="name@example.com"
                ref={emailInput}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="loginForm.ControlPassword1"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name='password'
                ref={passwordInput}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button id='login'>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default Login;