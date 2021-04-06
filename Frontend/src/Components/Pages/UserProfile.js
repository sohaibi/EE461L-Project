import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// import '../../App.css';
import { Link } from 'react-router-dom';
import './UserProfile.css';

export default function UserProfile(props) {

    // check login status and user id
    const [isLogin, setIsLogin] = useState(props.isLogin);
    const [userID, setUserID] = useState(props.userID);
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [displayEdit, setDisplayEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    //new Profile data
    var newProfile = { 'Username': '', 'Email': '' }


    // synchronize with App.js's login status
    useEffect(() => {
        console.log('login status updated', props.isLogin);
        console.log('userID updated', props.userID);
        setUserID(props.userID)
        setIsLogin(props.isLogin)

        if (isLogin) {
            //fetch user profile data
            fetch('/userProfile',
                {
                    method: "GET",
                    cache: 'default',
                    credentials: 'include',
                    withCredentials: true,
                    headers: {
                        "content_type": "application/json",
                    },
                }
            ).then(res => res.json()).then(data => {
                console.log(data);
                if (data.message === "success") {
                    setEmail(data.email);
                    setUsername(data.username);
                }
                // else {
                //     // impossible to happen
                //     console.log(data.message);
                //     props.handleLogout()
                // }
            }).catch((error) => {
                console.error(error);
            });

        } else {
            // not login, do nothing

        }

    }, [props.isLogin, props.userID])


    // if 'Edit Profile Button' is clicked, switch to Edit Profile Page

    const handleEditProfile = () => setDisplayEdit(true);

    // fill in the new Profile
    const handleChange = (e) => {
        const { name, value } = e.target
        // this.setState({ [name]: value })
        // console.log(e.target.name)
        newProfile[name] = value;
        console.log(newProfile)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("making request to editProfile");
        if (newProfile.Username === username) {
            newProfile.Username = '';
        }
        if (newProfile.Email === email) {
            newProfile.Email = '';
        }
        console.log(newProfile);
        fetch('/userProfile',
            {
                method: "POST",
                cache: 'force-cache',
                credentials: 'include',
                withCredentials: true,
                headers: {
                    "content_type": "application/json",
                },
                body: JSON.stringify({
                    'username': newProfile.Username,
                    'email': newProfile.Email
                })
            }
        ).then(response => {
            return response.json()
        }).then(
            data => {
                console.log(data);
                if (data.message !== 'success') {
                    setErrorMessage(data.message)
                } else {
                    setErrorMessage('');
                    if (newProfile.Username !== "") {
                        setUsername(newProfile.Username);
                    }
                    if (newProfile.Email !== "") {
                        setEmail(newProfile.Email);
                    }
                    setDisplayEdit(false);
                }
            }).catch(error => {
                console.log("edit profile error", error);
            });

    }


    if (isLogin) {
        if (!displayEdit) {
            return (

                <div id='profile_page'>
                    <div id="view-profile"></div>
                    <div id='profile_content'>
                        <div class="pair">
                            <p class="profile_tag">Username</p>
                            <span class="v">{username}</span>
                        </div>
                        <div class="pair">
                            <p class="profile_tag">Email</p>
                            <span class="v">{email}</span>
                        </div>
                        <div class="pair">
                            <p class="profile_tag">Password</p>
                            <span class="v">••••••••</span>
                        </div>
                    </div>
                    <button onClick={handleEditProfile}>Edit Profile</button>

                </div>
            )
        } else {
            return (
                <div className='div-login'>

                    <div id="edit-profile"></div>
                    <form onSubmit={handleSubmit}>
                        <label for='username' >Username:</label>
                        <input id='username' maxlength='20' type='text' name='Username' placeholder={username} onChange={handleChange} />
                        <label for='email'>Email address:</label>
                        <input id='email' type='Email' name='Email' placeholder={email} onChange={handleChange} />
                        <p id='error_message'>{errorMessage}</p>
                        <button onSubmit={handleSubmit}>Save</button>
                    </form>

                </div>

            )
        }

    } else {
        return <Redirect to='/login' />;
    }


}