import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseForm from './CourseForm'
import { reset } from 'redux-form'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'
import CourseThumb from '../../Courses/CourseThumb'
import { defaultCourse } from '../../../modules/defaults'

class New extends Component {
  constructor() {
    super()
    this.state = {
      errors: null
    }
  }

  handleSubmit(courseValues) {
    // create course
    apiRequest("/courses", {
      method: 'post',
      body: JSON.stringify({
        course: courseValues
      })
    }, (response, status) => {
      if (status === 201) {
        this.setState({errors: {success: ["the course has been created."]}})
        this.props.clearCourseForm()
      } else {
        this.setState({errors: response})
      }
    })
  }

  render() {
    // this is for the live update of form as users type
    let mergedCourse
    if (this.props.courseForm && this.props.courseForm.values) {
      const mergedUI = Object.assign({}, defaultCourse.ui, this.props.courseForm.values.ui)
      mergedCourse = Object.assign({}, defaultCourse, this.props.courseForm.values)
      mergedCourse.ui = mergedUI
    } else {
      mergedCourse = defaultCourse
    }
    const courseThumb = <CourseThumb course={mergedCourse} />
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6">
            <br />
            <h4>New Course</h4>
            <CourseForm onSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}/>
          </div>
          <div className="col-12 col-sm-6">
            <br />
            {courseThumb}
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
  changePage: (url) => push(url),
  clearCourseForm: () => reset('course')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New)
