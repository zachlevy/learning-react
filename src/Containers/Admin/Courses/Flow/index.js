import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseForm from '../CourseForm'
import { apiRequest } from '../../../../modules/data'
import FlowSorter from './FlowSorter'
import { setCourse } from '../../../../modules/redux/course'
import { defaultCourse } from '../../../../modules/defaults'
import { push } from 'react-router-redux'

class Flow extends Component {
  constructor() {
    super()
    // keep the flow changes in a state until submit
    this.state = {
      flow: []
    }
  }

  // load the course flow and the challenges
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

  // keep the state in this component rather than the sorter itself
  handleCardUpdate(updatedFlow) {
    this.setState({flow: updatedFlow.cards})
  }

  // send to the api on save
  handleSubmit() {
    const submitFlow = this.state.flow.map((challenge) => {
      return {
        id: challenge.id,
        type: challenge.type
      }
    })
    // update only the flow for the course
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
    return (
      <div>
        <h3>Flow</h3>
        <button className="btn btn-primary btn-pointer" onClick={this.handleSubmit.bind(this)}>Save Flow</button>
        <br />
        <br />
        <FlowSorter handleCardUpdate={this.handleCardUpdate.bind(this)} cards={this.state.flow} />
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
