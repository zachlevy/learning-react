import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserForm from './UserForm'
import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

class New extends Component {

  handleSubmit(userValues) {
    console.log("handleSubmit", userValues)
    // create user
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          email: userValues.email,
          password: userValues.password,
          password_confirmation: userValues.password_confirmation
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      console.log("res.status", res.status)
      if (res.status !== 201) {
        res.json().then((response) => {
          console.log("!201", response)
          throw new SubmissionError(response)
        }).catch((errors) => {
          console.log("errors", errors)
        })
      } else {
        res.json().then((response) => {
          console.log("user", response)
          this.props.changePage("/login")
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
            <h4>Register</h4>
            <UserForm onSubmit={this.handleSubmit.bind(this)}/>
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
)(New)
