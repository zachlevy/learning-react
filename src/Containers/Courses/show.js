import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setCourse } from '../../modules/course'

class Course extends Component {
  componentDidMount() {
    console.log("componentDidMount")
    fetch(`http://localhost:3001/courses/${this.props.match.params.courseId}`).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      // this.setState({course: response})
      this.props.setCourse(response)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{this.props.course.title}</h1>
            <p>{this.props.course.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ul>
              {
                this.props.course.flow && this.props.course.flow.map((item, index) => {
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

const mapStateToProps = state => ({
  course: state.course
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setCourse
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)
