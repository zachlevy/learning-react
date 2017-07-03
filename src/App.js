import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Courses from './Courses'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Courses />
      </div>
    );
  }
}

export default App;
