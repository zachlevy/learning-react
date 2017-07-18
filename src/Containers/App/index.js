import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Home from '../Static/Home'
import Courses from '../Courses'
import Feedback from '../Static/Feedback'
import Course from '../Courses/show'
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'reactstrap'
import Logo from '../../vora_logo_20170717.svg'

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
        <div className="bg-white navbar-wrapper">
          <div className="container">
            <Navbar color="white" light toggleable>
              <NavbarToggler right onClick={this.toggle.bind(this)} />
              <NavbarBrand tag={Link} to="/">
                <svg className="navbar-logo">
                  <use xlinkHref={Logo + "#logo-layer"}></use>
                </svg> Vora
              </NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/courses">Mini Courses</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/feedback">Feedback</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/feedback" component={Feedback} />
          <Route path="/courses/:courseId" component={Course} />
        </Switch>
      </div>
    )
  }
}
export default App
