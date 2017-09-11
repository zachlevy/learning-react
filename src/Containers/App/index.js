import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Home from '../Static/Home'
import Courses from '../Courses'
import Feedback from '../Static/Feedback'
import Course from '../Courses/show'
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'reactstrap'
import Logo from '../../vora_logo_20170717.svg'
import { track } from '../../modules/analytics'
import FeedbackModal from '../Shared/FeedbackModal'
import NewUser from '../Users/New'
import Login from '../Users/Login'
import { clearUser } from '../../modules/redux/user'
import User from '../Users/Show'

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

  handleCallToActionClick(e) {
    track("Click CTA", {
      name: "CTA",
      action: "Click",
      text: e.target.innerHTML,
      eventLabel: e.target.innerHTML
    })
  }

  handleLogout() {
    console.log("handleLogout")
    this.props.clearUser()
    this.props.changePage("/")
  }

  render() {
    let userNavs
    if (this.props.user.email) {
      userNavs = (
        <div style={{display: 'flex'}}>
          <NavItem>
            <NavLink tag={Link} to={`/users/${this.props.user.id}`}>{this.props.user.email}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.handleLogout.bind(this)}>Logout</NavLink>
          </NavItem>
        </div>
      )
    } else {
      userNavs = (
        <div style={{display: 'flex'}}>
          <NavItem>
            <NavLink tag={Link} to="/login" onClick={this.handleCallToActionClick.bind(this)}>Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/users/new" onClick={this.handleCallToActionClick.bind(this)}>Sign Up</NavLink>
          </NavItem>
        </div>
      )
    }
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
                    <NavLink tag={Link} to="/courses" onClick={this.handleCallToActionClick.bind(this)}>Mini Courses</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/feedback" onClick={this.handleCallToActionClick.bind(this)}>Feedback</NavLink>
                  </NavItem>
                  {userNavs}
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
          <Route path="/users/new" component={NewUser} />
          <Route path="/users/:userId" component={User} />
          <Route path="/login" component={Login} />
        </Switch>

        <FeedbackModal />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  changePage: (url) => push(url),
  user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  clearUser
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
