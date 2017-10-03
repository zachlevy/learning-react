import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserForm from './UserForm'
import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import { apiRequest, getCurrentUser, getCurrentProfile } from '../../modules/data'
import { setCurrentUser, setJwt } from '../../modules/redux/user'
import { setProfile } from '../../modules/redux/profile'

class New extends Component {
  constructor() {
    super()
    this.state = {
      errors: null
    }
  }

  handleSubmit(userValues) {
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
            getCurrentUser((user) => {
              this.props.setCurrentUser(user)

              // get old anonymous profile
              const oldProfile = this.props.profile

              // get the new user profile
              getCurrentProfile((newProfile) => {
                // combined the new profile with the old profile
                delete oldProfile.user_id // remove old user_id which will be nil
                const combinedProfile = Object.assign({}, newProfile, oldProfile)
                combinedProfile.details.previous_anonymous_user_id = oldProfile.anonymous_user_id
                // update profile on server
                apiRequest(`/profiles/${newProfile.id}`, {
                  method: "put",
                  body: JSON.stringify({profile: combinedProfile}),
                }, (updatedProfileResponse, updatedProfileStatus) => {
                  if (updatedProfileStatus === 200) {
                    this.props.setProfile(updatedProfileResponse)
                    // redirect to user profile
                    this.props.changePage(`/users/${user.id}`)
                  }
                })
              })
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
  profile: state.profile
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
)(New)
