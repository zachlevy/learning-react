import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import LoginForm from './LoginForm'
import { SubmissionError } from 'redux-form'
import { setJwt, setCurrentUser } from '../../modules/redux/user'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      errors: null
    }
  }

  getCurrentUser(jwt) {
    console.log("getCurrentUser")
    fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: 'get',
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    }).then((res) => {
      res.json().then((response) => {
        console.log("user", response)
        this.props.setCurrentUser(response)
      })
    })
  }

  handleSubmit(userValues) {
    console.log("handleSubmit", userValues)
    fetch(`${process.env.REACT_APP_API_URL}/user_token`, {
      method: 'post',
      body: JSON.stringify({
        auth: {
          email: userValues.email,
          password: userValues.password,
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      console.log("res.status", res.status)
      if (res.status !== 201) {
        this.setState({errors: {email: [" not found or password doesn't match"]}})
        // no json errors for this route
        res.text().then((response) => {
          console.log("!201", response)
          throw new SubmissionError(response)
        }).catch((errors) => {
          console.log("errors", errors)
        })
      } else {
        res.json().then((response) => {
          console.log("else", response)
          this.props.setJwt(response.jwt)
          this.getCurrentUser(response.jwt)
          this.props.changePage("/courses")
        })
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
