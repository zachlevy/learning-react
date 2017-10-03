import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setCourse, insertCourseFlowChallenges, updateCourseFlowChallenge } from '../../modules/redux/course'
import { Switch, Route, Link } from 'react-router-dom'
import Challenge from '../Challenge/show'
import FontAwesome from 'react-fontawesome'
import { getIcon } from '../../modules/icons'
import { gradientBackground } from '../../modules/styles'
import { track } from '../../modules/analytics'
import { apiRequest } from '../../modules/data'

// wrapper for a course
// contains common methods to move the course form challenge to chalenge
class Course extends Component {
  componentDidMount() {
    apiRequest(`/courses/${this.props.match.params.courseId}`, {}, (courseResponse) => {
      this.props.setCourse(courseResponse)
      apiRequest(`/challenge_responses?course_id=${courseResponse.id}`, {}, (challengeResponsesResponse, status) => {
        if (status === 200) {
          challengeResponsesResponse.forEach((challengeResponse) => {
            this.props.updateCourseFlowChallenge(challengeResponse.challenge_id, challengeResponse.status)
          })
        }
      })
    })
    // scroll below navbar to give full screen effect
    document.getElementById("course-show").scrollIntoView()
  }

  // submit challeng response
  // input is an object, jsonb in the database
  // callback is a function that gets passed response and status as the params
  submitChallengeResponse(input, status, callback) {
    apiRequest("/challenge_responses", {
      method: "post",
      body: JSON.stringify({
        challenge_response: {
          input: input,
          challenge_id: this.props.challenge.id,
          course_id: this.props.course.id,
          status: status || "complete" // complete, attempt, or skip
          // authenticate to pass user_id
        }
      })
    }, callback)
  }

  // next challenge
  handleNextClick() {
    // find the current index in the course flow
    const currentChallengeIndex = this.props.course.flow.findIndex((item) =>  this.props.challenge.id === item.id)
    // get the next challenge index in the course flow array
    let nextChallengeIndex
    if (currentChallengeIndex < this.props.course.flow.length - 1) {
      nextChallengeIndex = currentChallengeIndex + 1
    } else {
      // go to feedback page at the end of the course challenges
      this.props.GoToFeedbackPage()
      return
    }
    // get the next challenge id from the array
    const nextChallengeId = this.props.course.flow[nextChallengeIndex].id
    // redirect to the next challenge
    this.props.changeCourseChallenge(this.props.course.id, nextChallengeId)
  }

  // skip to next challenges
  // used for analytics and UX
  handleSkipClick(challengeId, shownHelp) {
    track("Skip Challenge", {name: "Challenge", action: "Skip", challengeId: challengeId, showHelp: shownHelp})
    this.handleNextClick()
  }

  // go back 1 challenge in the course flow
  handleBackButton() {
    // find the current index in course flow
    const currentChallengeIndex = this.props.course.flow.findIndex((item) =>  this.props.challenge.id === item.id)
    // get the next challenge index in the course flow array
    let prevChallengeIndex
    if (currentChallengeIndex > 0) {
      prevChallengeIndex = currentChallengeIndex - 1
    }
    // get the last challenge id from the array
    const prevChallengeId = this.props.course.flow[prevChallengeIndex].id
    // redirect to the previous challenge
    this.props.changeCourseChallenge(this.props.course.id, prevChallengeId)
  }

  // inserts challenges into the flow if the user answers wrong
  // takes an input (from user) to match against only_inputs optional whitelist array. see the learning-api docs for more information on data formats
  handleInsertDependencies(input) {
    // find the current index in flow
    const currentChallengeIndex = this.props.course.flow.findIndex((item) =>  this.props.challenge.id === item.id)
    // check for only_inputs
    const insertDependencies = []
    this.props.challenge.dependencies.forEach((dependency) => {
      // default add, whitelist is optional
      if (!dependency.only_inputs) {
        insertDependencies.push(dependency)
        return
      }
      // optional whitelist
      if (dependency.only_inputs && dependency.only_inputs.includes(input)) {
        insertDependencies.push(dependency)
        return
      }
    })
    // insert the dependencies into the course flow
    this.props.insertCourseFlowChallenges(currentChallengeIndex + 1, insertDependencies)
  }

  // inserts challenges into the flow
  handleInsertChallenges(challenges) {
    // find the current index in flow
    const currentChallengeIndex = this.props.course.flow.findIndex((item) =>  this.props.challenge.id === item.id)
    // insert the dependencies into the course flow
    this.props.insertCourseFlowChallenges(currentChallengeIndex + 1, challenges)
  }

  render() {
    // used to calculate the progress bar
    let challengeWidth
    if (this.props.course.flow) {
      challengeWidth = Math.floor(10000 / this.props.course.flow.length) / 100
    }
    const challengeIndex = this.props.course.flow && this.props.course.flow.findIndex((challenge) => {return this.props.challenge.id === challenge.id})
    const reversedChallengeIndex = this.props.course.flow && this.props.course.flow.length - (challengeIndex + 1)
    const progressWidth = challengeIndex * challengeWidth + "%"

    return (
      <div id="course-show" className="course-show bg-gradient" style={gradientBackground(this.props.course.ui && this.props.course.ui.primaryColor, this.props.course.ui && this.props.course.ui.secondaryColor)}>
        <div className={"full-height bg-subtle" + (this.props.course.ui && this.props.course.ui.subtle ? " bg-subtle-" + this.props.course.ui.subtle : "bg-subtle-diamond")}>
          <div className="container full-height">
            <Switch>
              <Route path="/courses/:courseId/challenges/:challengeId" render={(props) => {
                  return <Challenge
                    {...props}
                    handleInsertDependencies={this.handleInsertDependencies.bind(this)}
                    handleInsertChallenges={this.handleInsertChallenges.bind(this)}
                    handleBackButton={this.handleBackButton.bind(this)}
                    handleSkipClick={this.handleSkipClick.bind(this)}
                    handleNextClick={this.handleNextClick.bind(this)}
                    submitChallengeResponse={this.submitChallengeResponse.bind(this)}
                  />
                }}
              />
            </Switch>
          </div>
        </div>
        <div className="course-progress-vertical hidden-xs-down">
          <div className="progress progress-bar-vertical">
            <div className="progress-bar progress-bar-striped" role="progressbar" style={{height: progressWidth}}></div>
          </div>
          <div className="timeline-buttons-vertical">
            {
              this.props.course.flow && this.props.course.flow.slice().reverse().map((challenge, index) => {
                return (
                  <div key={index} style={{height: challengeWidth + "%"}} className="text-center timeline-icon">
                    <Link className={"btn btn-timeline btn-link" + (index === reversedChallengeIndex ? " active" : "") + (!challenge.completionStatus ? " skip" : "")} to={`/courses/${this.props.course.id}/challenges/${challenge.id}`}><FontAwesome name={getIcon(challenge.type)} /></Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  course: state.course,
  challenge: state.challenge,
  user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setCourse,
  insertCourseFlowChallenges,
  updateCourseFlowChallenge,
  changeCourseChallenge: (courseId, challengeId) => push(`/courses/${courseId}/challenges/${challengeId}`),
  GoToFeedbackPage: () => push(`/feedback`)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)
