import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'

class Courses extends Component {
  constructor() {
    super()
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    apiRequest("/courses", {}, (response, status) => {
      if (status === 200) {
        this.setState({courses: response})
      }
    })
  }

  handleEditCourseFlow(courseId) {
    console.log("handleEditCourseFlow")
    this.props.changePage(`/admin/courses/${courseId}/flow`)
  }

  handleNewCourse() {
    console.log("handleNewCourse")
    this.props.changePage(`/admin/courses/new`)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <h4>Courses</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Edit Flow</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.courses.map((course, index) => {
                    return (
                      <tr>
                        <td>{course.id}</td>
                        <td>{course.title}</td>
                        <td><button className="btn btn-primary btn-pointer btn-sm" onClick={this.handleEditCourseFlow.bind(this, course.id)}>Flow</button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <button className="btn btn-primary btn-pointer" onClick={this.handleNewCourse.bind(this)}>New Course</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses)
