import React from 'react';
import './Register.css';
import { Redirect } from 'react-router-dom';
import UserForm from './UserForm';



//Create a new file called loginandRegister.js
/* Include a common class called loginandRegister that shares common information between the Login.js and the Register.js files
User Template used to lo
 */
class Register extends React.Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            Username: '',
            Email: '',
            Password: '',
            ConfirmPassword: '',
            error_message: '',
            isLogin: this.props.isLogin
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        */
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.isLogin !== this.props.isLogin) {
    //         console.log('prop.isLogin changed:', this.props.isLogin.toString());
    //         this.setState({ isLogin: nextProps.isLogin })
    //     }
    // }



    // handleChange = (e) => {
    //     const { name, value } = e.target
    //     this.setState({ [name]: value })

    // }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(this.state.Username);

    //     if (this.state.Password !== this.state.ConfirmPassword) {
    //         this.setState({ error_message: 'Password does not match with confirmed password' });
    //     } else {
    //         console.log("making request to register")
    //         fetch('/register',
    //             {
    //                 method: "POST",
    //                 cache: 'force-cache',
    //                 credentials: 'include',
    //                 withCredentials: true,
    //                 headers: {
    //                     "content_type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     'username': this.state.Username,
    //                     'password': this.state.Password,
    //                     'email': this.state.Email
    //                 })
    //             }
    //         ).then(response => {
    //             return response.json()
    //         }).then(
    //             data => {
    //                 console.log(data);
    //                 if (data.message !== 'success') {
    //                     this.setState({ error_message: data.message })
    //                     // //display for 1s
    //                     // this.state.timer = setTimeout(() => {
    //                     //     {
    //                     //         this.setState({ error_message: ' ' });
    //                     //     }
    //                     // }, 1000);


    //                 } else {
    //                     this.setState({ error_message: '' });
    //                     this.props.handleSuccessfulAuth(data);
    //                 }



    //             }).catch(error => {
    //                 console.log("registration error", error);
    //             });

    //     }




    // }

    render() {
        if (!this.state.isLogin) {
            return (

                <div className='div-login'>
                    <div className>
                        <div id="homeLogo-login"></div>
                        <form onSubmit={this.props.handleSubmit}>
                            <label for='username' >Username:</label>
                            <input id='username' maxlength='20' type='Username' name='Username' placeholder='Username' required onChange={this.props.handleChange} />
                            <label for='email'>Email address:</label>
                            <input id='email' type='Email' name='Email' placeholder='Email Address...' required onChange={this.props.handleChange} />
                            <label for='password' >Password:</label>
                            <input id='password' minlength='6' maxlength='20' type='Password' name='Password' placeholder='password...' required onChange={this.props.handleChange} />
                            <label for='password' >Confirm password:</label>
                            <input id='password' minlength='6' maxlength='20' type='Password' name='ConfirmPassword' placeholder='Confirm password...' required onChange={this.props.handleChange} />
                            <p id='error_message'>{this.state.error_message}</p>
                            <button id="Register" onClick="IdentifyButton(this.id)" onSubmit={this.props.handleSubmit}>Sign Up</button>
                        </form>
                    </div>
                </div>
            )
        }
        // already login
        return <Redirect to='/project' />;
        // return "Register.js embedded to direct to '/projects'."
    }
}

export default Register;