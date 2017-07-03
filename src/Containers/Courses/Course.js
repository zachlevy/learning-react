import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Course extends Component {
  render() {
    return (
      <div className="col-4">
        <p>{this.props.course.title}</p>
      </div>
    )
  }
}

Course.propTypes = {
  course: PropTypes.object
}

export default Course
