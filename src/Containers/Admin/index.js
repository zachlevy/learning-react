import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import NewCourse from './Courses/New'

// courses page
class Admin extends Component {

  render() {
    return (
      <div className="courses-index container-fluid">
        <div className="container">

          <div className="row">
            <div className="col-12">
              <br />
              <h1>Admin</h1>
              <Switch>
                <Route path="/admin/courses/new" component={NewCourse} />
              </Switch>
            </div>
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
