import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Badge } from 'reactstrap'

import { Link } from 'react-router-dom'

import { secondsToMinutes } from '../../modules/time'

class CourseThumb extends Component {
  render() {
    const course = this.props.course
    return (
      <div className="col-12 col-sm-3">
        <div>
          <img className="img-fluid" src={course.image_url} alt="course preview" />
        </div>
        <h5>{course.title}</h5>
        <p>{secondsToMinutes(course.est_duration)} min</p>
        <Link className="btn btn-primary" to={`/courses/${course.id}/challenges/${course.flow[0].id}`}>Start</Link>
        <ul className="list-inline">
        {
          course.tags.map((tag, index) => <li key={index} className="list-inline-item"><Badge color="default">{tag}</Badge></li>)
        }
        </ul>
      </div>
    )
  }
}

CourseThumb.propTypes = {
  course: PropTypes.object,
  handleCourseClick: PropTypes.func
}

export default CourseThumb
