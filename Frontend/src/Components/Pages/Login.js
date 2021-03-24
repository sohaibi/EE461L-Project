import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';


class Login extends React.Component {

    state = {
        username: '',
        pwd: '',
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
                        <label for='username'>Username</label>
                        <input id='username' type='username' name='username' placeholder='username' required onChange={this.handleChange} />
                        <label for='password'>Password</label>
                        <input id='password' type='password' name='pwd' placeholder='password' required onChange={this.handleChange} />
                        <Link to='/project' className='project'>
                        <button className="Log-In" onSubmit={this.handleSubmit}>Log In</button>
                        </Link>
                    </form>
                    <Link to="/register"
                        className="register">
                        <button Link>Register</button>
                    </Link>

                </div>
            </div>
        )
    }
}

export default Login;