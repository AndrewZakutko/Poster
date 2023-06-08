import './Dashboard.css'
import { Button, Divider, Form, Grid, Header, Icon, Modal } from "semantic-ui-react";
import { Link } from "react-scroll";
import mainImage from '../../../images/main-image.webp';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function Dashboard() {
    const [sigInState, signInDispatch] = React.useReducer(sighInReducer, {
        signInOpen: false,
        signInDimmer: undefined,
    });
    const [logInState, logInDispatch] = React.useReducer(logInReducer, {
        logInOpen: false,
        logInDimmer: undefined,
    });

    const { signInOpen, signInDimmer } = sigInState;
    const { logInOpen, logInDimmer } = logInState;
    
    const { register, handleSubmit, setValue, watch, formState: { errors }, trigger } = useForm();

    const handleChange = (e: any) => {
        e.persist();
        setValue(e.target.name, e.target.value);
        trigger(e.target.name);
    };

    const onRegisterSubmit = (value: any) => {
        alert("register submitted successfully");
        console.log(value);
    };

    const onLoginSubmit = (value: any) => {
        alert("login submitted successfully");
        console.log(value);
    };

    return(
        <div className="dashboard">
            <div className="dashboard-navbar">
                <div className="dashboard-navbar-title">
                    <Header as="h1" onClick={() => console.log('click')}>SENDmaster</Header>
                </div>
                <div className="dashboard-navbar-first-item">
                    <Link
                        activeClass="active"
                        to="howToUse"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        How to use it?
                    </Link>
                </div>
                <div className="dashboard-navbar-item">
                    <Link
                        activeClass="active"
                        to="generalInfo"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        General info
                    </Link>
                </div>
                <div className="dashboard-navbar-item">
                    <Link
                        activeClass="active"
                        to="comment"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        Write a comment
                    </Link>
                </div>
                <div className="dashboard-navbar-last-item">
                    <Button.Group>
                        <Button positive onClick={() => logInDispatch({ type: 'OPEN_MODAL', signInDimmer: 'inverted' })}>Log in</Button>
                        <Button.Or />
                        <Button primary onClick={() => signInDispatch({ type: 'OPEN_MODAL', signInDimmer: 'inverted' })}>Sign in</Button>
                    </Button.Group>
                </div>
                <Divider></Divider>
            </div>
            <div className="dashboard-content">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Icon name="send" size="huge"></Icon>
                            <h1>SEND POSTS EASILY AND CONVINIENTLY</h1>
                            <h3>Get easy way to create telegram posts using our application...</h3>
                            <br />
                            <h4>Our features:</h4>
                            <ul>
                                <li>simple text post</li>
                                <li>post with image</li>
                                <li>post with video</li>
                            </ul>
                            <br />
                            <br />
                            <Button inverted size="medium">START USING</Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <img src={mainImage} className="dashboard-image"/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider></Divider>
                <p className="email">sendmaster.support@gmail.com</p>
            </div>
            <div>
                <Modal
                    dimmer={signInDimmer}
                    open={signInOpen}
                    onClose={() => signInDispatch({type: 'CLOSE_MODAL'})}
                    className="modal"
                >
                    <Modal.Content>
                        <Modal.Header as="h1" className='modal-header'>
                            REGISTRATION
                        </Modal.Header>
                        <Form className='modal-form' onSubmit={handleSubmit(onRegisterSubmit)}>
                            <Form.Group widths="equal">
                                <Form.Input required label="First Name" placeholder="First Name" name="firstName" onChange={handleChange} error={!!errors.input}></Form.Input>
                                <Form.Input required label="Last Name" placeholder="Last Name" name="lastName" onChange={handleChange} error={!!errors.input}></Form.Input>
                            </Form.Group>
                            <Form.Input required label="Username" placeholder="Username" name="username"  onChange={handleChange} error={!!errors.input}></Form.Input>
                            <Form.Input required label="Email" placeholder="example@example.com" name="email"  onChange={handleChange} error={!!errors.input}></Form.Input>
                            <Form.Group widths="equal">
                                <Form.Input required label="Country" placeholder="Country" name="country"  onChange={handleChange} error={!!errors.input}></Form.Input>
                                <Form.Input required label="Address" placeholder="Address" name="address"  onChange={handleChange} error={!!errors.input}></Form.Input>
                                <Form.Input required label="Index" placeholder="12345" type='number' name="index" onChange={handleChange} error={!!errors.input}></Form.Input>
                            </Form.Group>
                            <Form.Input required label="Password" type='password' placeholder="Password" name="password" onChange={handleChange} error={!!errors.input}></Form.Input>
                            <div className='form-btns'>
                                <Button negative onClick={() => signInDispatch({type: 'CLOSE_MODAL'})}>
                                    Cancel
                                </Button>
                                <Button positive type='submit'> 
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
            <div>
                <Modal
                    dimmer={logInDimmer}
                    open={logInOpen}
                    onClose={() => logInDispatch({type: 'CLOSE_MODAL'})}
                    className="modal"
                >
                    <Modal.Content>
                        <Modal.Header as="h1" className='modal-header'>
                            Log In
                        </Modal.Header>
                        <Form className='modal-form' onSubmit={handleSubmit(onLoginSubmit)}>
                            <Form.Input required label="Username" placeholder="Username" name="username" onChange={handleChange} error={!!errors.input}></Form.Input>
                            <Form.Input required label="Password" type='password' placeholder="Your password" name="password" onChange={handleChange} error={!!errors.input}></Form.Input>
                            <div className='form-btns'>
                                <Button negative type='button' onClick={() => logInDispatch({type: 'CLOSE_MODAL'})}>
                                    Cancel
                                </Button>
                                <Button positive type='submit'>
                                    Log in
                                </Button>
                            </div>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        </div>
    )
}

function sighInReducer(state: any, action : any) {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { signInOpen: true, signInDimmer: action.dimmer }
      case 'CLOSE_MODAL':
        return { signInOpen: false }
      default:
        throw new Error()
    }
}

function logInReducer(state: any, action : any) {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { logInOpen: true, logInDimmer: action.dimmer }
      case 'CLOSE_MODAL':
        return { logInOpen: false }
      default:
        throw new Error()
    }
}


export default Dashboard;
