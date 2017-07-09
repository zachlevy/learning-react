import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Badge } from 'reactstrap'

import { Link } from 'react-router-dom'

class CourseThumb extends Component {
  render() {
    return (
      <div className="col-4">
        <div>
          <img className="img-fluid" src={this.props.course.image_url} />
        </div>
        <h4>{this.props.course.title}</h4>
        <Link className="btn btn-primary" to={`/courses/${this.props.course.id}`}>Start</Link>
        <ul className="list-inline">
        {
          this.props.course.tags.map((tag, index) => <li key={index} className="list-inline-item"><Badge color="default">{tag}</Badge></li>)
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
