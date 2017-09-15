import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseForm from './CourseForm'
import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'
import CourseThumb from '../../Courses/CourseThumb'
import { defaultCourse } from '../../../modules/defaults'
import SingleTarget from './SingleTarget'

class New extends Component {
  handleSubmit(flowValues) {
    console.log("handleSubmit", flowValues)
    // create course
    // apiRequest("/courses", {
    //   method: 'post',
    //   body: JSON.stringify({
    //     course: {
    //       flow: flowValues
    //     }
    //   })
    // }, (response, status) => {
    //
    // })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Course Flow</h1>
            <pre>{JSON.stringify(this.props.courseForm)}</pre>
            <SingleTarget />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  courseForm: state.form.course
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New)
