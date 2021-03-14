import React, { useState } from 'react';
import { BrowserRouter as Router,
    Switch,
    Route,
    Link 
} from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import './Header.css';

// Pages and Components //
import Home from '../Pages/Home';
import Datasets from '../Pages/Datasets';
import Login from '../Pages/Login';
import Menu from './Menu';

/* Pages: 
// Home   
// Demo
// Datasets
// Login / Logout
// User Menu (if logged in)
*/


function Header() { 

    const userOrGuest = false; // TODO: change to GET actual user state
    
    var logUser = "Sign In";
    if(userOrGuest) {
        logUser = "Sign Out"
    }

    // if menu is clicked, open it
    const [click, setClick] = useState(0);
    const handleClick = () => setClick(!click);


    return (
        <Router>
            <header>
                {/* Website Logo and Title */}
                <div id="header_icon">
                    <Link to="/" className="headerLink">
                        <div id="homeLogo"/>
                        <h1>WIRE Powderless</h1>
                    </Link>
                </div> 

                {/* Navigation */}
                <nav>
                    <Link to="../Pages/Datasets" className="headerLink">
                        Demo
                    </Link>
                    <Link to="../Pages/Datasets" className="headerLink">
                        Datasets
                    </Link>
                    <Link to="../Pages/Login" className="headerLink">
                        { logUser }
                    </Link>
                </nav>

                {/* User Menu (if logged in) */}
                <div id={userOrGuest ? 'displayButton' : 'hideButton'}>
                    <button type="button" 
                        id={!click ? 'menuClose' : 'menuOpen'} 
                        onClick={handleClick} />
                </div> 

            </header>

            <div id='MenuDivOpen'>
                <Slide direction="left" 
                    in={(userOrGuest && click)} 
                    mountOnEnter 
                    unmountOnExit>
                    <div><Menu /></div>
                </Slide>
            </div>

            <Switch>
                <Route path="/"><Home /></Route>
                <Route path="../Pages/Datasets"><Datasets /></Route>
                <Route path="../Pages/Login"><Login /></Route>
            </Switch>
        </Router>
    );
}

export default Header;