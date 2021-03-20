import React from 'react';
import './Register.css';

class Register extends React.Component
{
    state = {
        Username: '',
        Email:'',
        Password:'',
        ConfirmPassword:'',
    }
    
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        return(
            <div className='div-login'>
                <div className>
                    <form onSubmit = {this.handleSubmit}>
                        <input type='Username' name='Username' placeholder='Username' required onChange={this.handleChange} />
                        <input type='Email' name='Email' placeholder='Email Address...' required onChange = {this.handleChange} /> 
                        <input type='Password' name='pwd' placeholder='password...' required onChange = {this.handleChange} /> 
                        <input type='Confirm Password' name='pwd' placeholder='Confirm password...' required onChange = {this.handleChange} /> 
                        <button onSubmit = {this.handleSubmit}>Sign Up</button>
                    </form>
                </div>   
            </div>
          )
       }
}

export default Register;