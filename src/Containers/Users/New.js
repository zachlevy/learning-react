import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserForm from './UserForm'

class New extends Component {

  handleSubmit(userValues) {
    console.log("handleSubmit", userValues)
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          email: userValues.email,
          password: userValues.password,
          password_confirmation: userValues.passwordConfirmation
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 offset-sm-4">
            <br />
            <h4>Register</h4>
            <UserForm onSubmit={this.handleSubmit}/>
          </div>
        </div>
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
)(New)
