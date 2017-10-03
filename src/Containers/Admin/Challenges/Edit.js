import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ChallengeForm from './ChallengeForm'
import { SubmissionError, reset } from 'redux-form'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'

class Edit extends Component {
  constructor() {
    super()
    this.state = {
      errors: null,
      challenge: null
    }
  }

  componentDidMount() {
    apiRequest(`/challenges/${this.props.match.params.challengeId}`, {}, (response, status) => {
      if (status === 200) {
        this.setState({challenge: response})
      }
    })
  }

  handleSubmit(challengeValues) {
    // update challenge
    apiRequest(`/challenges/${this.props.match.params.challengeId}`, {
      method: 'put',
      body: JSON.stringify({
        challenge: Object.assign(challengeValues)
      })
    }, (challengeResponse, status) => {
      if (status === 200) {
        this.setState({errors: {success: ["the challenge has been updated."]}})
        this.props.clearChallengeForm()
      } else {
        this.setState({errors: challengeResponse})
      }
    })
  }

  render() {
    let challengeForm
    if (this.state.challenge) {
      challengeForm = <ChallengeForm initialValues={this.state.challenge} onSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}/>
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h4>Edit Challenge</h4>
            {challengeForm}
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
)(Edit)
