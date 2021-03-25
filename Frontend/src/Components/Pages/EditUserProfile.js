import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../../App.css';
import { Link } from 'react-router-dom';
import './EditUserProfile.css';

export default function EditUserProfile(props) {

    // check login status and user id
    const [isLogin, setIsLogin] = useState(props.isLogin);
    const [userID, setUserID] = useState(props.userID);

    const state = {
        username: '',
        pwd: '',
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    // synchronize with App.js's login status
    useEffect(() => {
        console.log('login status updated', props.isLogin);
        console.log('userID updated', props.userID);
        setUserID(props.userID)
        setIsLogin(props.isLogin)
    }, [props.isLogin, props.userID])


    if (isLogin) {
        return (

            <div id='changes_page'>
                <form>
                    <label for='username'>Username</label>
                    <input id='username' type='username' name='username' placeholder='username' />
                    <label for='password'>Password</label>
                    <input id='password' type='password' name='pwd' placeholder='password' />
                    <label for='email'>Email</label>
                    <input id='email' type='email' name='email' placeholder='email' />
                    <button>Save Changes</button>
                </form>
            </div>

        )
    } else {
        return <Redirect to='/login' />;
    }


}