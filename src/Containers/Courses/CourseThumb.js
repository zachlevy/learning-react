import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import { secondsToMinutes } from '../../modules/time'
import { gradientBackground } from '../../modules/styles'
import FontAwesome from 'react-fontawesome'

class CourseThumb extends Component {
  render() {
    const course = this.props.course
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
                <Link className="btn btn-outline-secondary btn-lg" to={`/courses/${course.id}/challenges/${course.flow[0].id}`}>Start</Link>
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
