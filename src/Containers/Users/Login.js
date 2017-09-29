import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import LoginForm from './LoginForm'
import { SubmissionError } from 'redux-form'
import { setJwt, setCurrentUser } from '../../modules/redux/user'
import { apiRequest, getCurrentUser, getCurrentProfile } from '../../modules/data'
import { setProfile } from '../../modules/redux/profile'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      errors: null
    }
  }

  handleSubmit(userValues) {
    console.log("handleSubmit", userValues)
    apiRequest("/user_token", {
      method: 'post',
      body: JSON.stringify({
        auth: {
          email: userValues.email,
          password: userValues.password,
        }
      })
    }, (response, status) => {
      if (status === 201) {
        this.props.setJwt(response.jwt)
        // get the user
        getCurrentUser(response.jwt, (userResponse) => {
          this.props.setCurrentUser(userResponse)
          // get the user profile
          getCurrentProfile(response.jwt, (profileResponse) => {
            this.props.setProfile(profileResponse)
            this.props.changePage(`/users/${userResponse.id}`)
          })
        })

      } else {
        // no json errors for this route
        this.setState({errors: {email: [" not found or password doesn't match"]}})
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 offset-sm-4">
            <br />
            <h4>Login</h4>
            <LoginForm onSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),
  setJwt,
  setCurrentUser,
  setProfile
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
