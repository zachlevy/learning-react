import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseForm from './CourseForm'
import { SubmissionError, reset } from 'redux-form'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'
import CourseThumb from '../../Courses/CourseThumb'
import { defaultCourse } from '../../../modules/defaults'

class New extends Component {
  constructor() {
    super()
    this.state = {
      errors: null,
      course: null
    }
  }

  componentDidMount() {
    apiRequest(`/courses/${this.props.match.params.courseId}`, {}, (response, status) => {
      if (status === 200) {
        this.setState({course: response})
      }
    })
  }

  handleSubmit(courseValues) {
    apiRequest(`/courses/${this.props.match.params.courseId}`, {
      method: 'put',
      body: JSON.stringify({
        course: courseValues
      })
    }, (response, status) => {
      if (status === 200) {
        this.setState({errors: {success: [`course #${this.props.match.params.courseId} has been updated`]}})
        this.props.clearCourseForm()
      } else {
        this.setState({errors: response})
      }
    })
  }

  render() {
    let mergedCourse
    let courseThumb
    let courseForm
    if (this.state.course) {
    // handling the fact that the state is empty when the page first renders
      if (this.props.courseForm && this.props.courseForm.values) {
        // this is for live updating the course preview as the form is filled out
        const mergedUI = Object.assign({}, this.state.course.ui, this.props.courseForm.values.ui)
        mergedCourse = Object.assign({}, this.state.course, this.props.courseForm.values)
        mergedCourse.ui = mergedUI
      } else {
        mergedCourse = this.state.course
      }
      courseThumb = <CourseThumb course={mergedCourse} />
      courseForm = <CourseForm initialValues={this.state.course} onSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} />
    } else {
      if (this.props.courseForm && this.props.courseForm.values) {
        const mergedUI = Object.assign({}, defaultCourse.ui, this.props.courseForm.values.ui)
        mergedCourse = Object.assign({}, defaultCourse, this.props.courseForm.values)
        mergedCourse.ui = mergedUI
      } else {
        mergedCourse = defaultCourse
      }
      courseThumb = <CourseThumb course={mergedCourse} />
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6">
            <br />
            <h4>Editing Course #{this.props.match.params.courseId}</h4>
            {courseForm}
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
