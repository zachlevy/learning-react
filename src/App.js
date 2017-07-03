import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      courses: []
    }
  }
  componentDidMount() {
    console.log("componentDidLoad")
    fetch("/courses").then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      this.setState({courses: response})
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          this.state.courses.map((course, index) => {
            return <p key={index}>{course.title}</p>
          })
        }
      </div>
    );
  }
}

export default App;
