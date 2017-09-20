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
    console.log("handleSubmit", courseValues)
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

    // let courseForm
    // if (this.state.course){
    //   courseForm = <CourseForm onSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}/>
  render() {
    let mergedCourse
    let courseThumb
    let courseForm

    if (this.state.course) {
      if (this.props.courseForm && this.props.courseForm.values) {
        const mergedUI = Object.assign({}, this.state.course.ui, this.props.courseForm.values.ui)
        mergedCourse = Object.assign({}, this.state.course, this.props.courseForm.values)
        mergedCourse.ui = mergedUI
        console.log("mergedCourse", mergedCourse)
      } else {
        mergedCourse = this.state.course
        console.log("default course")
      }
      courseThumb = <CourseThumb course={mergedCourse} />
      courseForm = <CourseForm onSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} />
    } else {
      if (this.props.courseForm && this.props.courseForm.values) {
        const mergedUI = Object.assign({}, defaultCourse.ui, this.props.courseForm.values.ui)
        mergedCourse = Object.assign({}, defaultCourse, this.props.courseForm.values)
        mergedCourse.ui = mergedUI
        console.log("mergedCourse", mergedCourse)
      } else {
        mergedCourse = defaultCourse
        console.log("default course")
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