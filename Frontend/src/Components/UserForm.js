import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './UserForm.css';

function UserForm(props) {
    if (props.type === 'login') {
        return (
            <div className='div-login'>
                <div id="homeLogo-login"></div>
                <form onSubmit={props.handleSubmit}>
                    <label for='username'>Username</label>
                    <input id='username' type='username' name='username' placeholder='username' required onChange={props.handleChange} />
                    <label for='password'>Password</label>
                    <input id='password' type='password' name='pwd' placeholder='password' required onChange={props.handleChange} />

                    <p id='error_message'>{props.error_message}</p>

                    <button onSubmit={props.handleSubmit}>Log In</button>
                    <Link to="/register"
                        className="register">
                        <button Link>Register</button>
                    </Link>
                </form>
            </div>

        )

    } else if (props.type === 'register') {
        return (
            <div className='div-login'>
                <div className>
                    <div id="homeLogo-login"></div>
                    <form onSubmit={props.handleSubmit}>
                        <label for='username' >Username:</label>
                        <input id='username' maxlength='20' type='Username' name='Username' placeholder='Username' required onChange={props.handleChange} />
                        <label for='email'>Email address:</label>
                        <input id='email' type='Email' name='Email' placeholder='Email Address...' required onChange={props.handleChange} />
                        <label for='password' >Password:</label>
                        <input id='password' minlength='6' maxlength='20' type='Password' name='Password' placeholder='password...' required onChange={props.handleChange} />
                        <label for='password' >Confirm password:</label>
                        <input id='password' minlength='6' maxlength='20' type='Password' name='ConfirmPassword' placeholder='Confirm password...' required onChange={props.handleChange} />
                        <p id='error_message'>{props.error_message}</p>
                        <button onSubmit={props.handleSubmit}>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default UserForm
