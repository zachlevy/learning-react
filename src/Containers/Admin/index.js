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

// courses page
class Admin extends Component {

  render() {
    return (
      <div className="courses-index container-fluid">
        <div className="row">
          <div className="col-12">
            <Nav>
              <NavItem>
                <NavLink tag={Link} to={`/admin/courses`}>Courses</NavLink>
              </NavItem>
            </Nav>
            <Switch>
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
