import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CourseThumb from './CourseThumb'
import { arrayChunk } from '../../modules/styles'

// builds the rows and columns for the course list
class CourseList extends Component {
  render() {
    return (
      <div>
        {
          arrayChunk(this.props.courses, 3).map((row, index) => {
            return (
              <div className="row" key={index}>
                {
                  row.map((course, index) => {
                    return <CourseThumb className="col-12 col-md-6 col-lg-4" key={index} course={course} />
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

CourseList.propTypes = {
  courses: PropTypes.array
}

export default CourseList
