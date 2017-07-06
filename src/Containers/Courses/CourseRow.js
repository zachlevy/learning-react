import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Badge } from 'reactstrap'

import { Link } from 'react-router-dom'

class CourseRow extends Component {
  render() {
    return (
      <div className="col-4">
        <p>{this.props.course.title}</p>
        <Link className="btn btn-primary" to={`/courses/${this.props.course.id}`}>Course {this.props.course.id}</Link>
        <ul className="list-inline">
        {
          this.props.course.tags.map((tag, index) => <li key={index} className="list-inline-item"><Badge color="primary">{tag}</Badge></li>)
        }
        </ul>
      </div>
    )
  }
}

CourseRow.propTypes = {
  course: PropTypes.object,
  handleCourseClick: PropTypes.func
}

export default CourseRow
