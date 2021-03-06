import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { apiRequest } from '../../../../modules/data'
import FlowSorter from './FlowSorter'
import { setCourse } from '../../../../modules/redux/course'
import { buildFormErrors } from '../../../../modules/forms'
import { push } from 'react-router-redux'

class Flow extends Component {
  constructor() {
    super()
    // keep the flow changes in a state until submit
    this.state = {
      flow: [],
      errors: null
    }
  }

  // load the course flow and the challenges
  componentDidMount() {
    // get course
    apiRequest(`/admin/courses/${this.props.match.params.courseId}`, {}, (courseResponse, status) => {
      if (status === 200) {
        this.props.setCourse(courseResponse)
        // get challenges in course
        apiRequest(`/admin/challenges?ids=${courseResponse.flow.map((c) => c.id).join(",")}`, {}, (challengesResponse, status) => {
          if (status === 200) {
            // set flow to the full challenge objects in order
            const flow = this.props.course.flow.map((flowChallenge) => {
              return Object.assign(challengesResponse.find((challenge) => {
                return flowChallenge.id === challenge.id
              }), flowChallenge)
            })
            this.setState({flow: flow})
          } else {
            this.setState({errors: challengesResponse})
          }
        })
      } else {
        this.setState({errors: courseResponse})
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
    apiRequest(`/admin/courses/${this.props.match.params.courseId}`, {
      method: 'put',
      body: JSON.stringify({
        course: {
          flow: submitFlow
        }
      })
    }, (response, status) => {
      if (status === 200) {
        this.setState({errors: {success: ["course flow updated"]}})
      } else {
        this.setState({errors: response})
      }
    })
  }

  handleNewChallenge() {
    this.props.changePage(`/admin/challenges/new?course_id=${this.props.match.params.courseId}`)
  }

  handleEditClick(challengeId, e) {
    this.props.changePage(`/admin/challenges/${challengeId}/edit`)
  }

  render() {
    const errors = buildFormErrors(this.state.errors)
    return (
      <div>
        <h3>{this.props.course && this.props.course.title} Flow</h3>
        {errors}
        <button className="btn btn-primary btn-pointer" onClick={this.handleSubmit.bind(this)}>Save Flow</button>
        <br />
        <br />
        <FlowSorter handleCardUpdate={this.handleCardUpdate.bind(this)} cards={this.state.flow} handleEditClick={this.handleEditClick.bind(this)}/>
        <button className="btn btn-primary btn-pointer" onClick={this.handleNewChallenge.bind(this)}>New Challenge</button>
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
