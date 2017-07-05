import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

class CourseRow extends Component {
  render() {
    return (
      <div className="col-4">
        <p>{this.props.course.title}</p>
        <Link className="btn btn-primary" to={`/courses/${this.props.course.id}`}>Course {this.props.course.id}</Link>
        <ul>
        {
          this.props.course.tags.map((tag, index) => <li key={index}>{tag}</li>)
        }
        </ul>
      </div>
    )
  }
}

CourseRow.propTypes = {
  course: PropTypes.object
}

export default CourseRow
