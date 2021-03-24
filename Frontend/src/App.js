import React from 'react'
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
import EditUserProfile from './Components/Pages/EditUserProfile';
import Hardware from './Components/Pages/HwForm';
import Project from './Components/Pages/ProjectPage/Project';

function App() {

  // helper function to communicate to backend 

  return (
    <>

      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path='/guide' component={UserGuide} />
          <Route path='/datasets' component={Datasets} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/download' component={DownloadDatasets}/>
          <Route path='/editProfile' component={EditUserProfile}/>
          <Route path='/hardware' component={Hardware}/>
          <Route path='/project' component={Project}/>
        </Switch>
        <Footer />
      </Router>

    </>
  );
}

export default App;
