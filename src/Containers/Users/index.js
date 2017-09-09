import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import Signup from './Signup'
import Signin from './Signin'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'reactstrap'
import { AuthGlobals } from "redux-auth/bootstrap-theme"

class Users extends Component {

  render() {
    return (
      <div className="">
        <h1>Users</h1>
        <AuthGlobals />
        <Switch>
          <Route path="/users/signup" render={(props) => {return <Signup {...props} />}} />
          <Route path="/users/signin" render={(props) => {return <Signin {...props} />}} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
