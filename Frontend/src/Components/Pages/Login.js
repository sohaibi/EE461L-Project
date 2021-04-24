import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import UserForm from '../UserForm';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: '',
            error_message: '',
            isLogin: props.isLogin

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
        // console.log(this.state.username)
        fetch('/login',
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
                    'password': this.state.pwd
                })
            }
        ).then(response => {
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
            }).catch(error => {
                console.log("login error", error);
            });

    }


    render() {
        if (!this.state.isLogin) {
            return (

                <UserForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} error_message={this.state.error_message} type={'login'} />
                // <div className='div-login'>

                //     {/* <p>{this.props.isLogin.toString()}</p> */}

                //     <div id="homeLogo-login"></div>
                //     <form onSubmit={this.handleSubmit}>
                //         <label for='username'>Username</label>
                //         <input id='username' type='username' name='username' placeholder='username' required onChange={this.handleChange} />
                //         <label for='password'>Password</label>
                //         <input id='password' type='password' name='pwd' placeholder='password' required onChange={this.handleChange} />

                //         <p id='error_message'>{this.state.error_message}</p>

                //         <button onSubmit={this.handleSubmit}>Log In</button>
                //         <Link to="/register"
                //             className="register">
                //             <button Link>Register</button>
                //         </Link>
                //     </form>



                // </div>
            )
        }
        // already login
        return <Redirect to='/project' />;
        // return "I will let you stay here"



    }
}

export default Login;