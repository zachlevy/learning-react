import React, { Component } from 'react'
import Course from './Course'

class Courses extends Component {
  constructor() {
    super()
    this.state = {
      courses: []
    }
  }
  componentDidMount() {
    console.log("componentDidLoad")
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
                <Course key={index} course={course} />
              )
            })
          }

        </div>
      </div>
    )
  }
}

export default Courses
