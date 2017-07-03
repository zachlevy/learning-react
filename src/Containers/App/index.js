import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Home from '../Home'
import Courses from '../Courses'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={Courses} />
        </main>
      </div>
    )
  }
}

export default App
