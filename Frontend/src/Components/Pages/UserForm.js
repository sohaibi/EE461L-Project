import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { Redirect } from 'react-router-dom';

import Login from './Login';
import Register from './Register';

class UserForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error_message: '',
            isLogin: this.props.isLogin,
            type: ''

        }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
}

componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin !== this.props.isLogin) {
        console.log('prop.isLogin changed:', this.props.isLogin.toString());
        this.setState({ isLogin: nextProps.isLogin })
    }
}

handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
}

handleSubmit = (e) => {
    e.preventDefault();
    console.log("making request to login")
    type = this.props.type;
    fetch('/' + type,
        {
            method: "POST",
            cache: 'force-cache',
            credentials: 'include',
            withCredentials: true,
            headers: {
                "content_type": "application/json",
            },

            body: JSON.stringify({
                
                'username': this.state.username,
                'password': this.state.password,
                'email': this.state.email
            }) 
        }
    
    )
  .then(response => {
            return response.json()
    }).then(
        data => {
            console.log(data);
            if (data.message !== 'success') {
                this.setState({ error_message: data.message })

            } else {
                this.setState({ error_message: '' });
                this.props.handleSuccessfulAuth(data);
            }
        }).catch(
            error => {
            console.log("error", error);
        });
    }

    
}



