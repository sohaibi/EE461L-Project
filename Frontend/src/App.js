import React from 'react'
import './App.css';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';

// Pages and Components //
import Header from './Components/Header';
import Home from './Components/Pages/Home';
import UserGuide from './Components/Pages/UserGuide';
import Datasets from './Components/Pages/Datasets';
import Footer from './Components/Footer';

function App() {

  // helper function to communicate to backend 

  return (
    <>
    <Router>
      <Header />
      <Switch>
        <Route exact path ='/' component={Home} />
        <Route path = '/guide' component={UserGuide} /> 
        <Route path = '/datasets' component={Datasets} />
      </Switch>
      <Footer />
    </Router>
    </>
  );
}

export default App;
