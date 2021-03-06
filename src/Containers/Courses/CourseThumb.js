import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import { secondsToMinutes } from '../../modules/time'
import { gradientBackground } from '../../modules/styles'
import FontAwesome from 'react-fontawesome'
import { apiRequest } from '../../modules/data'

// used to render the course thumbnails in course lists
class CourseThumb extends Component {
  constructor() {
    super()
    this.state = {
      firstChallengeId: null,
      completed: false
    }
  }

  componentDidMount() {
    // get the next challenge without a challenge response
    if (this.props.course.attempted === true) {
      apiRequest(`/challenge_responses?course_id=${this.props.course.id}`, {}, (response, status) => {
        if (status === 200) {
          if (response.length > 0) {
            const lastChallengeResponse = response[response.length - 1]
            const lastChallengeFlowIndex = this.props.course.flow.findIndex((flowChallenge) => {
              return flowChallenge.id === lastChallengeResponse.challenge_id
            })
            const nextChallenge = this.props.course.flow[lastChallengeFlowIndex + 1]
            // check if it's the last challenge in the flow
            if (!nextChallenge) {
              this.setState({completed: true})
            } else {
              this.setState({firstChallengeId: nextChallenge.id || (this.props.course.flow[0] && this.props.course.flow[0].id)})
            }
          }
        }
      })
    }
  }
  render() {
    const course = this.props.course
    let link
    if (course.flow[0]) {
      let text
      if (course.attempted) {
        if (this.state.completed) {
          text = "Restart"
        } else {
          text = "Continue"
        }
      } else {
        text = "Start"
      }
      link = <Link className="btn btn-outline-secondary btn-lg" to={`/courses/${course.id}/challenges/${this.state.firstChallengeId || course.flow[0].id}`}>{text}</Link>
    }
    let review
    if (course.attempted) {
      review = <Link className="btn btn-outline-secondary btn-lg" to={`/courses/${course.id}/attempts`}>Review</Link>
    }
    return (
      <div className={this.props.className}>
        <div className="card course-thumb">
          <div className={"card-img-top bg-gradient bg-subtle bg-subtle-" + (course.ui.subtle)} style={Object.assign({}, gradientBackground(course.ui.primaryColor, course.ui.secondaryColor), {minHeight: "350px"})}>
            <div className="row">
              <div className="col-12 text-center">
                <h1 className=""><FontAwesome name={course.ui.icon} /></h1>
                <h5>{course.title}</h5>
                <p>{secondsToMinutes(course.est_duration)} min</p>
                <p>{course.description}</p>
                <ul className="list-inline">
                {
                  course.tags.map((tag, index) => <li key={index} className="list-inline-item"><Badge color="default">{tag}</Badge></li>)
                }
                </ul>
                <br />
                {link} {review}
                <br />
                &nbsp;
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    )
  }
}

CourseThumb.propTypes = {
  course: PropTypes.object
}

export default CourseThumb
