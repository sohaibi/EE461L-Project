import React from 'react';
import './Login.css';


 class Login extends React.Component {
    
    state = {
        username: '',
        pwd: '',
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
                    <input type='password' name='pwd' placeholder='password...' required onChange = {this.handleChange} /> 
                    <button onSubmit = {this.handleSubmit}>Log In</button>
                </form>
            </div>   
        </div>
      )
   }
 }

 export default Login;