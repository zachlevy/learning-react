import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ChallengeForm from './ChallengeForm'
import { reset } from 'redux-form'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'

class New extends Component {
  constructor() {
    super()
    this.state = {
      errors: null
    }
  }

  handleSubmit(challengeValues) {
    // optional course id
    const courseId = new URLSearchParams(this.props.location.search).get('course_id')
    // create course
    apiRequest("/challenges", {
      method: 'post',
      body: JSON.stringify({
        challenge: Object.assign(challengeValues, {course_id: courseId})
      })
    }, (challengeResponse, status) => {
      if (status === 201) {
        this.setState({errors: {success: ["the challenge has been created."]}})
        this.props.clearChallengeForm()

        // this following callback hell should be changed when we move course flow to a join table
        // get course
        apiRequest(`courses/${courseId}`, {}, (courseResponse, courseStatus) => {
          if (courseStatus === 200) {

            // get challengeType
            apiRequest(`/challenge_types/${challengeResponse.challenge_type_id}`, {
            }, (challengeTypeResponse, challengeTypeStatus) => {
              if (challengeTypeStatus === 200) {
                // update course
                apiRequest(`/courses/${courseId}`, {
                  method: 'put',
                  body: JSON.stringify({
                    course: {
                      flow: courseResponse.flow.concat([{id: challengeResponse.id, type: challengeTypeResponse.name}])
                    }
                  })
                }, (updateCourseResponse, updateCourseStatus) => {
                  if (updateCourseStatus === 200) {
                    this.props.changePage(`/admin/courses/${courseId}/flow`)
                  }
                })
              }
            })
          }
        })




      } else {
        this.setState({errors: challengeResponse})
      }
    })
  }

  render() {
    // optional course_id

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h4>New Challenge</h4>
            <ChallengeForm onSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challengeForm: state.form.challenge
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),
  clearChallengeForm: () => reset('challenge')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New)
