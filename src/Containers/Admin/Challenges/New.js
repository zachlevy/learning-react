import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ChallengeForm from './ChallengeForm'
import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'
import { defaultChallenge } from '../../../modules/defaults'

class New extends Component {
  constructor() {
    super()
    this.state = {
      errors: null
    }
  }

  handleSubmit(challengeValues) {
    console.log("handleSubmit", challengeValues)
    // create course
    apiRequest("/challenges", {
      method: 'post',
      body: JSON.stringify({
        challenge: challengeValues
      })
    }, (response, status) => {
      if (status === 201) {
        this.setState({errors: {success: ["the course has been created."]}})
      } else {
        this.setState({errors: response})
      }
    })
  }

  render() {
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
  changePage: (url) => push(url)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New)
