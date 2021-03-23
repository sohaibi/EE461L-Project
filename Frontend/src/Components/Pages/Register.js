import React from 'react';
import './Login.css';

class Register extends React.Component {
    state = {
        Username: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div className='div-login'>
                <div className>
                    <form onSubmit={this.handleSubmit}>
                        <label for='new_username'>Username:</label>
                        <input id='new_user' type='Username' name='Username' placeholder='Username' required onChange={this.handleChange} />
                        <label for='new_email'>Email address:</label>
                        <input id='new_email' type='Email' name='Email' placeholder='Email Address...' required onChange={this.handleChange} />
                        <label for='new_pwd'>Password:</label>
                        <input id='new_pwd' type='Password' name='Password' placeholder='password...' required onChange={this.handleChange} />
                        <label for='new_pwd1'>Confirm password:</label>
                        <input id='new_pwd1' type='Password' name='ConfirmPassword' placeholder='Confirm password...' required onChange={this.handleChange} />
                        <button className="register-button" onSubmit={this.handleSubmit}>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;