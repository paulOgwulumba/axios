import './CSS/App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './Routes/Home'
import Customer from './Routes/Customer';
import Seller from './Routes/Seller';
import React from 'react';

class App extends React.Component{
  constructor(){
    super()
    this.state = { products: [] }
    
  }

  render(){
    
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li className="logo">
                <Link to="/">Avios</Link>
              </li>
              <li>
                <Link to="/customer">Customer</Link>
              </li>
              <li>
                <Link to="/seller">Seller</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/customer" element={<Customer  />} />
    
            <Route path="/seller" element={<Seller />} />
            
            <Route path="/" element={<Home />} />
              
          </Routes>
        </div>
      </Router>
    )
  }
}


export default App;
