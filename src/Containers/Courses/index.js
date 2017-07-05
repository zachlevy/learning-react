import React, { Component } from 'react'
import CourseRow from './CourseRow'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setCourses } from '../../modules/courses'

class Courses extends Component {
  componentDidMount() {
    console.log("componentDidMount")
    fetch("http://localhost:3001/courses").then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      this.setState({courses: response})
      this.props.setCourses(response)
    })
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-12">
            <h1>Courses</h1>
          </div>
        </div>
        <div className="row">
          {
            this.props.courses && this.props.courses.map((course, index) => {
              return (
                <div key={index}>
                  <CourseRow course={course} />
                  <button onClick={() => this.props.changePage(course.id)}>Go to course page via redux</button>
                </div>
              )
            })
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
