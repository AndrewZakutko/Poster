import './Dashboard.css'
import { Button, Divider, Form, Grid, Header, Icon, Label, Modal } from "semantic-ui-react";
import { Link } from "react-scroll";
import mainImage from '../../../../images/main-image.webp';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AccountService from '../../../../services/account.service';
import React from 'react';
import { User } from '../../../../models/user';

function Dashboard() {
    const [sigInState, signInDispatch] = React.useReducer(sighInReducer, {
        signInOpen: false,
        signInDimmer: undefined,
    });
    const [logInState, logInDispatch] = React.useReducer(logInReducer, {
        logInOpen: false,
        logInDimmer: undefined,
    });

    const accountService = new AccountService();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | undefined>();
    const [errorMessage, setErrorMessage] = useState('');

    const { signInOpen, signInDimmer } = sigInState;
    const { logInOpen, logInDimmer } = logInState;
    
    const { handleSubmit, setValue, formState: { errors } } = useForm();

    const handleChange = (event: any) => {
        setValue(event.target.name, event.target.value);
    };

    const onRegisterSubmit = async (data: any) => {
        try 
        {
            const response = await accountService.register(data);
            setUser(response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.userName);
            setIsLoggedIn(true);
            setErrorMessage('');
            signInDispatch({ type: 'CLOSE_MODAL' });
        } 
        catch (error: any) 
        {
          setErrorMessage(error.response.data);
        }
    };

    const onLoginSubmit = async (data: any) => {
        try 
        {
            const response = await accountService.login(data);
            setUser(response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.userName);
            setIsLoggedIn(true);
            setErrorMessage('');
            logInDispatch({ type: 'CLOSE_MODAL' });
        } 
        catch (error: any) 
        {
          setErrorMessage(error.response.data);
        }
    };

    const logout = () => {
        setUser(undefined);
        setIsLoggedIn(false);
        localStorage.clear();
    }

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsLoggedIn(true);
        }
    })

    return(
        <div className="dashboard">
            <div className="dashboard-navbar">
                <div className="dashboard-navbar-title">
                    <Header as="h1" onClick={() => window.location.href = '/'}>SENDmaster</Header>
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
                    {!isLoggedIn ?  
                        (
                        <Button.Group>
                            
                            <Button onClick={() => logInDispatch({ type: 'OPEN_MODAL', signInDimmer: 'inverted' })} inverted size="medium">Log in</Button>
                            <Button.Or />
                            <Button onClick={() => signInDispatch({ type: 'OPEN_MODAL', signInDimmer: 'inverted' })} inverted size="medium">Sign in</Button>
                        </Button.Group> 
                        )
                        : 
                        (
                            <>
                            <Label as='a' image>
                                <Icon name='user'></Icon>
                                {localStorage.getItem('username')}
                            </Label>
                            <Button onClick={() => logout()} inverted circular icon='log out'></Button>
                            </>
                        )
                    }
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
                            {isLoggedIn ? 
                            (
                                <Button onClick={() => {window.location.href = "/workspace"}} inverted size="medium">START USING</Button>
                                
                            ) : (
                                <>
                                    <Button disabled inverted size="medium">START USING</Button>
                                    <div className='additional-information'>To start using, you need to <a>login...</a></div>
                                </>
                            )}
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
                        <div className="wrapper">
                            <Modal.Header as="h1" className='modal-header'>
                                Register
                            </Modal.Header>
                            <Form className='modal-form' onSubmit={handleSubmit(onRegisterSubmit)}>
                                <Form.Group widths="equal">
                                    <Form.Input required label="First Name" placeholder="First Name" name="firstName" onChange={handleChange} error={!!errors.input}></Form.Input>
                                    <Form.Input required label="Last Name" placeholder="Last Name" name="lastName" onChange={handleChange} error={!!errors.input}></Form.Input>
                                </Form.Group>
                                <Form.Input required label="Username" placeholder="Username" name="userName" onChange={handleChange} error={!!errors.input}></Form.Input>
                                <Form.Input required label="Email" placeholder="example@example.com" name="email" onChange={handleChange} error={!!errors.input}></Form.Input>
                                <Form.Group widths="equal">
                                    <Form.Input required label="Country" placeholder="Country" name="country" onChange={handleChange} error={!!errors.input}></Form.Input>
                                    <Form.Input required label="Address" placeholder="Address" name="address" onChange={handleChange} error={!!errors.input}></Form.Input>
                                    <Form.Input required label="Index" placeholder="12345" type='number' name="index" onChange={handleChange} error={!!errors.input}></Form.Input>
                                </Form.Group>
                                <Form.Input required label="Password" type='password' placeholder="Password" name="password" onChange={handleChange} error={!!errors.input}></Form.Input>
                                <div className='form-btns'>
                                    <Button onClick={() => signInDispatch({type: 'CLOSE_MODAL'})}>
                                        Cancel
                                    </Button>
                                    <Button type='submit'> 
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        </div>
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
                        <div className="wrapper">
                            <Modal.Header as="h1" className='modal-header'>
                                Welcome
                            </Modal.Header>
                            <Form className='modal-form' onSubmit={handleSubmit(onLoginSubmit)}>
                                <Form.Input required type='email' label="Email" placeholder="Email" name="email" onChange={handleChange} error={!!errors.input}></Form.Input>
                                <Form.Input required label="Password" type='password' placeholder="Your password" name="password" onChange={handleChange} error={!!errors.input}></Form.Input>
                                {errorMessage && (
                                    <div className="error-message">{errorMessage}</div>
                                )}
                                <div className='form-btns'>
                                    <Button type='button' onClick={() => logInDispatch({type: 'CLOSE_MODAL'})}>
                                        Cancel
                                    </Button>
                                    <Button type='submit'>
                                        Log in
                                    </Button>
                                </div>
                            </Form>
                        </div>
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