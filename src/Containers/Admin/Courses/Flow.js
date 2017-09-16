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
  constructor() {
    super()
    this.state = {
      flow: []
    }
  }

  componentDidMount() {
    console.log("Course Flow", this.props.match.params.courseId)
    // get course
    apiRequest(`/courses/${this.props.match.params.courseId}`, {}, (courseResponse, status) => {
      if (status === 200) {
        this.props.setCourse(courseResponse)
        // get challenges in course
        apiRequest(`/challenges?ids=${courseResponse.flow.map((c) => c.id).join(",")}`, {}, (challengesResponse, status) => {
          if (status === 200) {
            // set flow to the full challenge objects in order
            const flow = this.props.course.flow.map((flowChallenge) => {
              return Object.assign(challengesResponse.find((challenge) => {
                return flowChallenge.id === challenge.id
              }), flowChallenge)
            })
            this.setState({flow: flow})
          }
        })
      }
    })
  }

  handleSubmit() {
    console.log("handleSubmit", this.state.flow)
    const submitFlow = this.state.flow.map((challenge) => {
      return {
        od: challenge.id,
        type: challenge.type
      }
    })
    // create course
    apiRequest(`/courses/${this.props.match.params.courseId}`, {
      method: 'put',
      body: JSON.stringify({
        course: {
          flow: submitFlow
        }
      })
    }, (response, status) => {

    })
  }

  render() {
    let sortableFlow
    if (this.state.flow.length > 0) {
      sortableFlow = <Sort cards={this.state.flow}/>
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Course Flow</h1>
            <pre>{JSON.stringify(this.state.flow)}</pre>
            <button className="btn btn-primary btn-pointer" onClick={this.handleSubmit.bind(this)}>Save Flow</button>
            {sortableFlow}
            <button className="btn btn-primary btn-pointer" onClick={this.handleSubmit.bind(this)}>Save Flow</button>
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
