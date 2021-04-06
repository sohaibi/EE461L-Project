import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


// Pages and Components //
import Header from './Components/Header';
import Home from './Components/Pages/Home';
import UserGuide from './Components/Pages/UserGuide';
import Datasets from './Components/Pages/Datasets';
import Footer from './Components/Footer';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import DownloadDatasets from './Components/Pages/DownloadDatasets';
import UserProfile from './Components/Pages/UserProfile';
import Hardware from './Components/Pages/HwForm';
import Project from './Components/Pages/ProjectPage/Project';

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userID, setUserID] = useState('-1')


  // check login status from backend server when mount
  useEffect(() => {

    fetch('/login',
      {
        method: "GET",
        cache: 'default',
        credentials: 'include',
        withCredentials: true,
        headers: {
          "content_type": "application/json",
        },
      }
    ).then(res => res.json()).then(data => {
      console.log(data);
      if (data.ans === "Y") {
        setIsLogin(true);
        setUserID(data.userID);

      } else {
        setIsLogin(false);
        console.log(isLogin);
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  // handle successful login from children
  const handleSuccessfulAuth = (data) => {
    // data = data.json();
    setIsLogin(true);
    setUserID(data.userID);

    console.log("this is from App.js")

    // this.props.history.push("/projects")   - does not work, don't know why
  }

  // handle logout from children
  const handleLogout = () => {
    // data = data.json();
    setIsLogin(false);
    setUserID('-1');

    console.log("this is Logout from App.js")


  }



  return (
    <>
      {/* <p>{userID}</p> */}
      <Router>
        < Header isLogin={isLogin} userID={userID} handleLogout={handleLogout}
        />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path='/guide' component={UserGuide} />
          <Route path='/datasets' component={Datasets} />
          <Route
            path='/login'
            render={props => (
              <Login {...props} isLogin={isLogin} handleSuccessfulAuth={handleSuccessfulAuth} />
            )}
          />
          <Route
            path='/register'
            render={props => (
              <Register {...props} isLogin={isLogin} handleSuccessfulAuth={handleSuccessfulAuth} />
            )}
          />
          <Route path='/download' component={DownloadDatasets} />
          <Route
            path='/userProfile'
            render={props => (
              <UserProfile {...props} isLogin={isLogin} userID={userID} handleLogout={handleLogout} />
            )}
          />
          <Route
            path='/hardware'
            render={props => (
              <Hardware {...props} isLogin={isLogin} userID={userID} />
            )}
          />
          <Route
            path='/project'
            render={props => (
              <Project {...props} isLogin={isLogin} userID={userID} />
            )}
          />
        </Switch>

        <Footer />
      </Router>

    </>
  );
}

export default App;
