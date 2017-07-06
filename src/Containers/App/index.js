import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Home from '../Home'
import Courses from '../Courses'
import Course from '../Courses/show'
import Counter from '../Counter'
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
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle.bind(this)} />
          <NavbarBrand tag={Link} to="/">reactstrap</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/courses">Course</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/counter">Counter</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={Courses} />
          <Route path="/courses/:courseId" component={Course} />
          <Route exact path="/counter" component={Counter} />
        </Switch>
      </div>
    )
  }
}
export default App
