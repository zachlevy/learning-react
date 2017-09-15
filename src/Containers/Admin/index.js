import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'
import NewCourse from './Courses/New'
import Flow from './Courses/Flow'
import NewChallenge from './Challenges/New'

// courses page
class Admin extends Component {

  render() {
    return (
      <div className="courses-index container-fluid">
        <div className="row">
          <div className="col-12">
            <Nav>
              <NavItem>
                <NavLink tag={Link} to={`/admin/courses/new`}>New Course</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={`/admin/courses/flow`}>Course Flow</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={`/admin/challenges/new`}>New Challenge</NavLink>
              </NavItem>
            </Nav>
            <Switch>
              <Route path="/admin/courses/new" component={NewCourse} />
              <Route path="/admin/courses/flow" component={Flow} />
              <Route path="/admin/challenges/new" component={NewChallenge} />
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
