import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import './EditUserProfile.css';

export default function EditUserProfile(){

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

    return(

        <div id='changes_page'>
             <form>
                <label for='username'>Username</label>
                <input id='username' type='username' name='username' placeholder='username'/>
                <label for='password'>Password</label>
                <input id='password' type='password' name='pwd' placeholder='password'/>
                <label for='email'>Email</label>
                <input id='email' type='email' name='email' placeholder='email'/>
                <button>Save Changes</button>
            </form>
        </div>

        )
   
}