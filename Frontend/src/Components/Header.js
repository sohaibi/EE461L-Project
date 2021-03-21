import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import './Header.css';

// Pages and Components //
import Menu from './Menu';

function Header() {

    // TODO: method to determine if user is logged in 
    const [isUser, setUser] = useState(false);
    const handleSignOut = () => setUser(false);    // if Sign Out is clicked, set to Guest Mode

    var logUser = "Sign In";
    var logLink = "/login"; // add link to sign in 
    if (isUser) {
        logUser = "Sign Out"
        logLink = "/";
    }

    // if menu is clicked, open it
    const [clickMenu, setClick] = useState(true);
    const handleClick = () => setClick(!clickMenu);

    /** TODO:
     *  1. Notify about successful log out 
     *  2. 
     */

    return (
        <>
            <header>
                {/* Website Logo and Title */}
                <div id="header_icon">
                    <Link to="/" className="headerLink">
                        <div id="homeLogo" />
                        <h1>WIRE Powderless</h1>
                    </Link>
                </div>

                {/* Navigation */}
                <nav>
                    <Link to="/guide" className="headerLink">
                        User Guide
                </Link>
                    <Link to="/datasets" className="headerLink">
                        Datasets
                </Link>
                    <Link to={logLink}
                        className="headerLink"
                        onClick={handleSignOut}>
                        {logUser}
                    </Link>
                </nav>

                {/* User Menu (if logged in) */}
                <div id={isUser ? 'displayButton' : 'hideButton'}>
                    <button type="button"
                        id={!clickMenu ? 'menuClose' : 'menuOpen'}
                        onClick={handleClick} />
                </div>

            </header>

            {/* Menu component slides into the screen */}
            <div id='MenuDivOpen'>
                <Slide direction="down"
                    in={(isUser && clickMenu)}
                    mountOnEnter
                    unmountOnExit>
                    <div><Menu /></div>
                </Slide>
            </div>
        </>
    );
}

export default Header;