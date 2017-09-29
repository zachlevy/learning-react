import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserForm from './UserForm'
import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import { apiRequest, getCurrentUser } from '../../modules/data'
import { setCurrentUser, setJwt } from '../../modules/redux/user'

class New extends Component {
  constructor() {
    super()
    this.state = {
      errors: null
    }
  }

  handleSubmit(userValues) {
    console.log("handleSubmit", userValues)
    // create user
    apiRequest("/users", {
      method: 'post',
      body: JSON.stringify({
        user: {
          email: userValues.email,
          password: userValues.password,
          password_confirmation: userValues.password_confirmation
        }
      })
    }, (response, status) => {
      if (status === 201) {
        // authenticate
        apiRequest("/user_token", {
          method: "post",
          body: JSON.stringify({
            auth: {
              email: userValues.email,
              password: userValues.password
            }
          })
        }, (response, status) => {
          this.props.setJwt(response.jwt)
          if (status === 201) {
            // get user self
            getCurrentUser(response.jwt, (user) => {
              this.props.setCurrentUser(user)
              this.props.changePage(`/users/${user.id}`)
            })
          }
        })

      } else {
        this.setState({errors: response})
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 offset-sm-4">
            <br />
            <h4>Signup</h4>
            <UserForm
              onSubmit={this.handleSubmit.bind(this)}
              errors={this.state.errors}
              submitButtonText="Signup"
              submitButtonClass="btn btn-primary btn-block"
            />
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
)(New)
