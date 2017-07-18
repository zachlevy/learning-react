import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setCourse } from '../../modules/course'
import { Switch, Route, Link } from 'react-router-dom'
import Challenge from '../Challenge/show'
import FontAwesome from 'react-fontawesome'
import { getIcon } from '../../modules/icons'
import { gradientBackground } from '../../modules/styles'
import { secondsToMinutes } from '../../modules/time'

class Course extends Component {
  componentDidMount() {
    console.log("componentDidMount")
    fetch(`${process.env.REACT_APP_API_URL}/courses/${this.props.match.params.courseId}`).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      // this.setState({course: response})
      this.props.setCourse(response)
    })
  }

  handleNextClick() {
    console.log("handleNextClick")
    // find the current index in flow
    const currentChallengeIndex = this.props.course.flow.findIndex((item) =>  this.props.challenge.id === item.id)
    // get the next challenge index in the course flow array
    let nextChallengeIndex
    if (currentChallengeIndex < this.props.course.flow.length - 1) {
      nextChallengeIndex = currentChallengeIndex + 1
    } else {
      nextChallengeIndex = 0
    }
    // get the next challenge id from the array
    const nextChallengeId = this.props.course.flow[nextChallengeIndex].id
    // redirect
    this.props.changeCourseChallenge(this.props.course.id, nextChallengeId)
  }

  handleSkipClick() {
    console.log("handleSkipClick")
    this.handleNextClick()
  }

  render() {
    let challengeWidth
    if (this.props.course.flow) {
      challengeWidth = Math.floor(100 / this.props.course.flow.length)
    }
    let disableButtonsAtIndex = false
    return (
      <div id="course-show" className="course-show bg-gradient" style={gradientBackground(this.props.course.ui && this.props.course.ui.primaryColor, this.props.course.ui && this.props.course.ui.secondaryColor)}>
        <div className="bg-pattern full-height">
          <div className="container full-height">
            <Switch>
              <Route path="/courses/:courseId/challenges/:challengeId" render={(props) => {return <Challenge {...props} handleSkipClick={this.handleSkipClick.bind(this)} handleNextClick={this.handleNextClick.bind(this)} />}} />
            </Switch>
            <div className="course-progress">
              <div className="row">
                <div className="col-12">
                  <hr className="course-timeline" />
                </div>
              </div>
              <div className="row">
                {
                  this.props.course.flow && this.props.course.flow.map((challenge, index) => {
                    return (
                      <div key={index} style={{width: challengeWidth + "%"}} className="text-center">
                        <Link className={"btn btn-timeline btn-outline-secondary" + (disableButtonsAtIndex ? " disabled" : "") + (challenge.id === this.props.challenge.id ? disableButtonsAtIndex = true && " active" : "")} to={`/courses/${this.props.course.id}/challenges/${challenge.id}`}><FontAwesome name={getIcon(challenge.type)} /></Link>
                      </div>
                    )
                  })
                }
              </div>
              <div className="row">
                <div className="col-12">
                  <p className="course-title-timeline text-center">Mini Course: {this.props.course.title} ~{secondsToMinutes(this.props.course.est_duration)} min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  course: state.course,
  challenge: state.challenge,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setCourse,
  changeCourseChallenge: (courseId, challengeId) => push(`/courses/${courseId}/challenges/${challengeId}`)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)
