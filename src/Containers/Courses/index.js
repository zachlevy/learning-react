import React, { Component } from 'react'
import CourseThumb from './CourseThumb'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setCourses } from '../../modules/courses'

class Courses extends Component {
  componentDidMount() {
    console.log("componentDidMount")
    fetch(`${process.env.REACT_APP_API_URL}/courses`).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      this.setState({courses: response})
      this.props.setCourses(response)
    })
  }

  handleCourseClick() {
    this.props.changePage(this.props.course.id)
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-12">
            <br />
            <h3 className="text-center">Mini Courses are the smartest way to learn</h3>
            <br />
          </div>
        </div>
        <div className="row">
          {
            this.props.courses && this.props.courses.map((course, index) => <CourseThumb className="col-12 col-sm-4" key={index} course={course} handleCourseClick={this.handleCourseClick.bind(this)} />)
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  courses: state.courses
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setCourses,
  changePage: (courseId) => push(`/courses/${courseId}`)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses)
