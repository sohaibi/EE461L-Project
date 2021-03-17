import React from 'react'
import './App.css';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';

// Pages and Components //
import Header from './Components/Header';
import Home from './Components/Pages/Home';
import Link1 from './Components/Pages/Link1';
import Link2 from './Components/Pages/Link2';
import Footer from './Components/Footer';

function App() {
  return (
    <>
    {/* <div className='App'> */}
    {/* <Header /> */}
      <Router>
        <Header />
        <Switch>
          {/* <Route path="/"><Home /></Route> */}
          <Route path = '/' exact component={Home} />
          <Route path = '/link1'  component={Link1} />
          <Route path = '/link2'  component={Link2} />
        </Switch>
        <Footer />
      </Router>
      </>
  );
}

export default App;
