import React, { Component } from 'react'

class Course extends Component {
  constructor() {
    super()
    this.state = {
      course: {}
    }
  }
  componentDidMount() {
    console.log("componentDidMount")
    fetch(`http://localhost:3001/courses/${this.props.match.params.courseId}`).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      this.setState({course: response})
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{this.state.course.title}</h1>
            <p>{this.state.course.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ul>
              {
                this.state.course.flow && this.state.course.flow.map((item, index) => {
                  return <li key={index}>{JSON.stringify(item)}</li>
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Course
