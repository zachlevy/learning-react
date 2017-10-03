import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'
import NewCourse from './Courses/New'
import Flow from './Courses/Flow'
import NewChallenge from './Challenges/New'
import EditChallenge from './Challenges/Edit'
import EditCourse from './Courses/Edit'
import Courses from './Courses'
import Users from './Users'
import AnonymousUsers from './AnonymousUsers'
import ChallengeResponses from './ChallengeResponses'
import Feedbacks from './Feedbacks'

// courses page
class Admin extends Component {

  render() {
    return (
      <div className="courses-index container-fluid">
        <div className="row">
          <div className="col-12">
            <Nav className="list-inline">
              <NavItem className="list-inline-item">
                <NavLink tag={Link} to={`/admin/courses`}>Courses</NavLink>
                <NavLink tag={Link} to={`/admin/users`}>Users</NavLink>
                <NavLink tag={Link} to={`/admin/anonymous_users`}>Anonymous Users</NavLink>
                <NavLink tag={Link} to={`/admin/challenge_responses`}>Challenge Responses</NavLink>
                <NavLink tag={Link} to={`/admin/feedbacks`}>Feedbacks</NavLink>
              </NavItem>
            </Nav>
            <Switch>
              <Route exact path="/admin/users" component={Users} />
              <Route exact path="/admin/anonymous_users" component={AnonymousUsers} />
              <Route exact path="/admin/challenge_responses" component={ChallengeResponses} />
              <Route exact path="/admin/feedbacks" component={Feedbacks} />
              <Route exact path="/admin/courses" component={Courses} />
              <Route exact path="/admin/courses/new" component={NewCourse} />
              <Route exact path="/admin/courses/:courseId/flow" component={Flow} />
              <Route exact path="/admin/challenges/new" component={NewChallenge} />
              <Route exact path="/admin/challenges/:challengeId/edit" component={EditChallenge} />
              <Route exact path="/admin/courses/:courseId/edit" component={EditCourse} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)
