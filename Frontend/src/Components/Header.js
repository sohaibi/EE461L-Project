import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import './Header.css';

// Pages and Components //
import Menu from './Menu';

function Header(props) {

    // TODO: method to determine if user is logged in 
    const [isUser, setUser] = useState(props.isLogin);
    const [userID, setUserID] = useState(props.userID);

    const handleSignOut = () =>
    // setUser(false);    // if Sign Out is clicked, set to Guest Mode
    {
        if (isUser) {
            fetch('/logout',
                {
                    method: "POST",
                    cache: 'force-cache',
                    credentials: 'include',
                    withCredentials: true,
                    headers: {
                        "content_type": "application/json",
                    },
                    body: JSON.stringify({
                        'userID': userID,
                    })
                }
            ).then(response => {
                return response.json()
            }).then(
                data => {
                    console.log(data);
                    if (data.message !== 'logout successfully') {
                        console.log(data.message);
                        // //display for 1s
                        // this.state.timer = setTimeout(() => {
                        //     {
                        //         this.setState({ error_message: ' ' });
                        //     }
                        // }, 1000);


                    } else {
                        props.handleLogout()
                    }



                }).catch(error => {
                    console.log("registration error", error);
                });
        }


    }

    useEffect(() => {
        console.log('count changed', props.isLogin);
        setUser(props.isLogin)
    }, [props.isLogin])

    var logUser = "Sign In";
    var logLink = "/login"; // add link to sign in 
    if (isUser) {
        logUser = "Sign Out"
        logLink = "/";
    }

    // if menu is clicked, open it
    const [clickMenu, setClick] = useState(false);
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
                    <Link to={{ pathname: logLink, state: { isLogin: isUser } }}
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