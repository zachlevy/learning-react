import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Home from '../Home'
import Courses from '../Courses'
import Course from '../Courses/show'
import Challenge from '../Challenge/show'
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'reactstrap'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }
  render() {
    return (
      <div>
        <div className="bg-faded">
          <div className="container">
            <Navbar color="faded" light toggleable>
              <NavbarToggler right onClick={this.toggle.bind(this)} />
              <NavbarBrand tag={Link} to="/">Vora</NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/courses">Mini Courses</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={Courses} />
          <Route path="/courses/:courseId" component={Course} />
        </Switch>
      </div>
    )
  }
}
export default App
