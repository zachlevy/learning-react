import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Home from '../Home'
import Courses from '../Courses'
import Course from '../Courses/show'
import Counter from '../Counter'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/counter">Counter</Link>
        </header>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/courses/:courseId" component={Course} />
          <Route exact path="/counter" component={Counter} />
        </Switch>
      </div>
    )
  }
}

export default App
