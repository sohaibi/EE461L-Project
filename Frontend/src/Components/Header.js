import React, { useState } from 'react';
import { BrowserRouter as Router,
    Link 
} from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import './Header.css';

// Pages and Components //
// import Home from './Pages/Home';
// import Datasets from './Pages/Datasets';
// import Login from './Pages/Login';
import Menu from './Menu';

/* Header Pages: 
// Home   
// Demo
// Datasets
// Login / Logout
// User Menu (if logged in)
*/


function Header() { 

    // TODO: method to determine if user is logged in 
    const [userOrGuest, setUser] = useState(0);
    const handleSignOut = () => setUser(!userOrGuest);    // if Sign Out is clicked, set to Guest Mode
    
    var logUser = "Sign In";
    var logLink = ""; // add link to sign in 
    if(userOrGuest) {
        logUser = "Sign Out"
        logLink = "";
    }

    // if menu is clicked, open it
    const [click, setClick] = useState(0);
    const handleClick = () => setClick(!click);

    /** TODO:
     *  1. Notify about successful log out 
     *  2. 
     */


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
                <Link to="/guide" className="headerLink">
                    User Guide
                </Link>
                <Link to="/datasets"className="headerLink">
                    Datasets
                </Link>
                <Link to={ logLink } 
                    className="headerLink" 
                    onClick={ handleSignOut }> 
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

        {/* Menu component slides into the screen */}
        <div id='MenuDivOpen'>
            <Slide direction="down" 
                in={(userOrGuest && click==1)} 
                mountOnEnter 
                unmountOnExit>
                <div><Menu /></div>
            </Slide>
        </div>
        </Router>
    );
}

export default Header;