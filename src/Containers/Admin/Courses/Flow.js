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
import Sort from './Sort'
import { setCourse } from '../../../modules/redux/course'

class Flow extends Component {
  componentDidMount() {
    console.log("Course Flow", this.props.match.params.courseId)
    apiRequest(`/courses/${this.props.match.params.courseId}`, {}, (response, status) => {
      if (status === 200) {
        this.props.setCourse(response)
      }
    })
  }

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
    let sortableFlow
    if (this.props.course.id == this.props.match.params.courseId) {
      sortableFlow = <Sort cards={this.props.course.flow}/>
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Course Flow</h1>
            <pre>{this.props.match.params.courseId}</pre>
            <pre>{JSON.stringify(this.props.course.id)}</pre>
            {sortableFlow}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  courseForm: state.form.course,
  course: state.course
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),
  setCourse
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flow)
