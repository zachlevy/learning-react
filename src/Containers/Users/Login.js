import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import LoginForm from './LoginForm'
import { SubmissionError } from 'redux-form'
import { setJwt, setCurrentUser } from '../../modules/redux/user'
import { apiRequest, getCurrentUser } from '../../modules/data'

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
        getCurrentUser(response.jwt, (response) => {
          this.props.setCurrentUser(response)
          this.props.changePage(`/users/${response.id}`)
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
  setCurrentUser
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
