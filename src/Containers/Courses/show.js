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
    // scroll below navbar to give full screen effect
    document.getElementById("course-show").scrollIntoView()
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
      challengeWidth = Math.floor(10000 / this.props.course.flow.length) / 100
    }
    const challengeIndex = this.props.course.flow && this.props.course.flow.findIndex((challenge) => {return this.props.challenge.id === challenge.id})
    const progressWidth = challengeIndex * challengeWidth + "%"
    console.log("challengeIndex", challengeIndex)
    return (
      <div id="course-show" className="course-show bg-gradient" style={gradientBackground(this.props.course.ui && this.props.course.ui.primaryColor, this.props.course.ui && this.props.course.ui.secondaryColor)}>
        <div className={"full-height bg-subtle" + (this.props.course.ui && this.props.course.ui.subtle ? " bg-subtle-" + this.props.course.ui.subtle : "bg-subtle-diamond")}>
          <div className="container full-height">
            <Switch>
              <Route path="/courses/:courseId/challenges/:challengeId" render={(props) => {return <Challenge {...props} handleSkipClick={this.handleSkipClick.bind(this)} handleNextClick={this.handleNextClick.bind(this)} />}} />
            </Switch>
            <div className="course-progress">
              <div className="row">
                <div className="col-12">
                  <div className="progress course-timeline">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: progressWidth}}></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {
                    this.props.course.flow && this.props.course.flow.map((challenge, index) => {
                      return (
                        <div key={index} style={{width: challengeWidth + "%"}} className="text-center timeline-icon">
                          <Link className={"btn btn-timeline btn-link" + (index > challengeIndex ? " disabled" : "") + (index === challengeIndex ? " active" : "")} to={`/courses/${this.props.course.id}/challenges/${challenge.id}`}><FontAwesome name={getIcon(challenge.type)} /></Link>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p className="course-title-timeline text-center">{this.props.course.title} {secondsToMinutes(this.props.course.est_duration)} min</p>
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
