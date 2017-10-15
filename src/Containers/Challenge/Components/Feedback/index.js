import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import { track } from '../../../../modules/analytics'
import { markdownToHTML } from '../../../../modules/strings'
import { apiRequest } from '../../../../modules/data'
import FeedbackForm from './FeedbackForm'
import { reset } from 'redux-form'

class Feedback extends Component {
  constructor() {
    super()
    this.state = {
      showHelp: false,
      errors: []
    }
  }

  handleNextClick() {
    if (this.props.showNextButton) {
      this.props.submitChallengeResponse(null, "complete")
      this.props.handleNextClick()
    }
  }

  handleSubmit(feedbackValues) {
    // create user
    apiRequest("/feedbacks", {
      method: 'post',
      body: JSON.stringify({
        feedback: {
          source: "feedback_challenge",
          body: Object.assign({context: this.props, challenge_id: this.props.challengeId}, feedbackValues)
        }
      })
    }, (response, status) => {
      if (status === 201) {
        this.setState({errors: {success: ["Thanks for the feedback!"]}})
        this.props.clearFeedbackForm()
        this.props.handleShowNextButton()
      } else {
        this.setState({errors: response})
      }
    })
  }

  toggleShowHelp(e) {
    track("Toggle Help", {
      name: "Help",
      action: "Toggle",
      challengeId: this.props.challengeId,
      content: this.props
    })
    this.setState({showHelp: !this.state.showHelp})
  }

  render() {
    let help
    help = (
      <li className="list-inline-item">
        <button className="btn btn-link btn-pointer" onClick={this.toggleShowHelp.bind(this)}>help <FontAwesome name="question-circle" /></button>
      </li>
    )
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <FeedbackForm
              onSubmit={this.handleSubmit.bind(this)}
              errors={this.state.errors}
              fields={this.props.fields}
              submitButtonClass="btn btn-outline-secondary btn-lg"
              submitButtonText="Submit"
            />
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
                  <button className="btn btn-link btn-pointer" onClick={this.props.handleBackButton.bind(this)}><span>back</span></button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-link btn-pointer" onClick={this.props.handleSkipClick.bind(this, this.props.challengeId, this.state.showHelp)}>skip</button>
                </li>
                <li className="list-inline-item">
                  <button className={"btn btn-outline-secondary btn-lg btn-pointer" + (this.props.showNextButton ? "" : " disabled")} onClick={this.handleNextClick.bind(this)}>Next</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Feedback.propTypes = {
  help: PropTypes.string,
  fields: PropTypes.array,

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
})

const mapDispatchToProps = dispatch => bindActionCreators({
  clearFeedbackForm: () => reset('feedback')
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feedback)
