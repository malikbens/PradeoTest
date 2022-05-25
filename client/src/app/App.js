
import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route,  } from 'react-router-dom';
import Home from '../pages/Home';
import Applications from '../pages/Applications';
import Application from '../pages/Application';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';
 
class App extends Component {
  render() {
    return (
       <Router>
           <div className="App">
           <Routes>
                 <Route exact path='/' element={< Home />}></Route>
                 <Route exact path='/applications' element={< Applications />}></Route>
                 <Route exact path='/applications/:id' element={< Applications />}>
                 </Route>
          </Routes>
          </div>
       </Router>
   );
  }
}
 
export default App;