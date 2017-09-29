import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import { track } from '../../../modules/analytics'
import { markdownToHTML } from '../../../modules/strings'
import UserForm from '../../Users/UserForm'
import { apiRequest, getCurrentUser } from '../../../modules/data'
import { setCurrentUser, setJwt } from '../../../modules/redux/user'

class UserSignup extends Component {
  constructor() {
    super()
    this.state = {
      showHelp: false,
      feedback: "",
      signupSuccess: false
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.setState({signupSuccess: true})
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
              this.setState({signupSuccess: true})
              this.props.handleShowNextButton()
            })
          }
        })

      } else {
        this.setState({errors: response})
      }
    })
  }

  handleShowHelp(e) {
    track("Show Help", {
      name: "Help",
      action: "Show",
      challengeId: this.props.challengeId,
      content: this.props
    })
    this.setState({showHelp: true})
  }

  render() {
    let help
    help = (
      <li className="list-inline-item">
        <button role="button" className="btn btn-link" onClick={this.handleShowHelp.bind(this)}>help <FontAwesome name="question-circle" /></button>
      </li>
    )
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <div>{markdownToHTML(this.props.messaging)}</div>
          </div>
          <div className="col-12 col-sm-6">
            <UserForm
              onSubmit={this.handleSubmit.bind(this)}
              errors={this.state.errors}
              submitButtonClass={this.state.signupSuccess ? "btn btn-outline-secondary btn-block btn-lg disabled" : "btn btn-outline-secondary btn-block btn-lg"}
              submitButtonText={this.state.signupSuccess ? "Thanks for signing up!" : "Signup"}
            />
            <br />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            {this.state.showHelp && (markdownToHTML(this.props.help) || "Signup if you'd like.")}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <ul className="list-inline">
                {help}
                <li className="list-inline-item">
                  <button role="button" className="btn btn-link" onClick={this.props.handleBackButton.bind(this)}><span>back</span></button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className="btn btn-link" onClick={this.props.handleSkipClick.bind(this, this.props.challengeId, this.state.showHelp)}>skip</button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className={"btn btn-outline-secondary btn-lg" + (this.props.showNextButton ? "" : " disabled")} onClick={this.props.handleNextClick.bind(this)}>Next</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UserSignup.propTypes = {
  help: PropTypes.string,
  messaging: PropTypes.string,

  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string,
  submitChallengeResponse: PropTypes.func
}

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setJwt,
  setCurrentUser
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSignup)
