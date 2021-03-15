import React from 'react'
import { BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from 'react-router-dom';
import './App.css';

// Pages and Components //
import Header from './Components/Header';
import Home from './Pages/Home';
import Footer from './Components/Footer';

function App() {

  return (
    <div className='App'>
      <Header />
      <Router>
        <Switch>
          <Route path="/"><Home /></Route>
          {/* 
          <Route path="../Pages/Datasets"><Datasets /></Route>
          <Route path="../Pages/Login"><Login /></Route> 
          */}
        </Switch>
      </Router>
      
      <Footer />
    </div>
  );
}

export default App;
