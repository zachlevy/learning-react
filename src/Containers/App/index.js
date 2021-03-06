import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import { Switch, Route, Link, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Home from '../Static/Home'
import Courses from '../Courses'
import Feedback from '../Static/Feedback'
import Course from '../Courses/show'
import Admin from '../Admin'
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'reactstrap'
import Logo from '../../vora_logo_20170717.svg'
import { track } from '../../modules/analytics'
import FeedbackModal from '../Shared/FeedbackModal'
import NewUser from '../Users/New'
import Login from '../Users/Login'
import User from '../Users/Show'
import { apiRequest, logout } from '../../modules/data'
import Attempts from '../Courses/Attempts'
import Collection from '../Collections/show'
import { setProfile, getAndSetProfileFromApi } from '../../modules/redux/profile'
import { setFeedbackModal, setFeedbackContext, setFeedbackMessaging } from '../../modules/redux/feedback'

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

  handleFeedbackClick(e) {
    this.props.setFeedbackModal(true)
    this.props.setFeedbackContext(this.props)
    this.props.setFeedbackMessaging([
      {
        question: "Message",
        name: "message",
        inputType: "textarea"
      }, {
        question: "Email",
        name: "email",
        inputType: "input"
      }, {
        question: "Name",
        name: "name",
        inputType: "input"
      }, {
        question: "Would you like us to respond?",
        name: "respond",
        inputType: "checkbox"
      }
    ])
  }

  handleLogout() {
    logout()
    this.props.changePage("/")
  }

  componentDidMount() {
    // load profile when the app loads
    // there is probably some redundency here
    this.props.getAndSetProfileFromApi()
  }

  render() {
    let userNavs = []
    if (this.props.user.email) {
      userNavs.push((
        <NavItem key="user">
          <NavLink tag={Link} to={`/users/${this.props.user.id}`}>{this.props.user.email}</NavLink>
        </NavItem>
      ))
      userNavs.push((
        <NavItem key="logout">
          <a className="nav-link btn-pointer" onClick={this.handleLogout.bind(this)}>Logout</a>
        </NavItem>
      ))
    } else {
      userNavs.push((
        <NavItem key="login">
          <NavLink tag={Link} to="/login" onClick={this.handleCallToActionClick.bind(this)}>Login</NavLink>
        </NavItem>
      ))
      userNavs.push((
        <NavItem key="new-user">
          <NavLink tag={Link} to="/users/new" onClick={this.handleCallToActionClick.bind(this)}>Sign Up</NavLink>
        </NavItem>
      ))
    }
    let adminNavs
    if (this.props.user && this.props.user.admin === true) {
      adminNavs = (
        <NavItem key="admin">
          <NavLink tag={Link} to="/admin">Admin</NavLink>
        </NavItem>
      )
    }
    let routes
    // ensure there's an anonymous or logged in user
      let adminRoutes
      if (this.props.user.anonymous_user_id || this.props.user.id) {
        if (this.props.user.admin === true) {
          adminRoutes = <Route path="/admin" component={Admin} />
        }
        routes = (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/collections/:collectionId" component={Collection} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/courses/:courseId/attempts" component={Attempts} />
            <Route path="/courses/:courseId" component={Course} />
            <Route exact path="/users/new" component={NewUser} />
            <Route path="/users/:userId" component={User} />
            <Route exact path="/login" component={Login} />
            {adminRoutes}
          </Switch>
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
                  <NavItem key="physics">
                    <NavLink tag={Link} to="/collections/phy-131" onClick={this.handleCallToActionClick.bind(this)}>PHY 131</NavLink>
                  </NavItem>
                  <NavItem key="mini-courses">
                    <NavLink tag={Link} to="/courses" onClick={this.handleCallToActionClick.bind(this)}>Mini Courses</NavLink>
                  </NavItem>
                  <NavItem key="logout">
                    <a className="nav-link btn-pointer" onClick={this.handleFeedbackClick.bind(this)}>Feedback</a>
                  </NavItem>
                  {adminNavs}
                  {userNavs}
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </div>

        {routes}

        <FeedbackModal />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),
  setProfile,
  getAndSetProfileFromApi,
  setFeedbackModal,
  setFeedbackContext,
  setFeedbackMessaging
}, dispatch)

export default DragDropContext(HTML5Backend)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App)))
