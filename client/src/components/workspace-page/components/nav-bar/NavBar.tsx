import { Button, Header, Icon, Label } from 'semantic-ui-react';
import './NavBar.css';

function NavBar () {
    return(
        <div className="nav-bar">
            <div className="navbar-title">
                <Header as="h1" onClick={() => window.location.href = '/'}>SENDmaster</Header>
            </div>
            <div className="nav-bar-last-item">
                <Label as='a' image>
                    <Icon name='user'></Icon>
                    {localStorage.getItem('username')}
                </Label>
                <Button onClick={() => window.location.href = '/'} inverted circular icon='backward'></Button>
            </div>
        </div>
    )
}

export default NavBar;