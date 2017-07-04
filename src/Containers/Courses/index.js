import React, { Component } from 'react'
import CourseRow from './CourseRow'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class Courses extends Component {
  constructor() {
    super()
    this.state = {
      courses: []
    }
  }
  componentDidMount() {
    console.log("componentDidMount")
    fetch("http://localhost:3001/courses").then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      this.setState({courses: response})
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
            this.state.courses.map((course, index) => {
              return (
                <div>
                  <CourseRow key={index} course={course} />
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

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (courseId) => push(`/courses/${courseId}`)
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Courses)
