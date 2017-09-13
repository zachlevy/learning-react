import React, { Component } from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { parseApiErrors } from '../../../modules/strings'
import { defaultChallenge } from '../../../modules/defaults'
import { apiRequest } from '../../../modules/data'
import { buildFormFields, buildFormErrors } from '../../../modules/forms'
import { snakeCaseToSpaceCase, capitalizeWords } from '../../../modules/strings'

class ChallengeForm extends Component {
  constructor() {
    super()
    this.state = {
      challengeTypes: [],
      selectedChallengeType: null
    }
  }

  componentDidMount() {
    console.log("componentDidMount")
    apiRequest(`/challenge_types`, {
    }, (response, status) => {
      console.log("challenge_types", response)
      this.setState({challengeTypes: response})
    })
  }

  handleChallengeTypeChange(e) {
    console.log("handleChallengeTypeChange", e.target.value)
    const selectedChallengeType = this.state.challengeTypes.find((challengeType) => {return challengeType.id == e.target.value})
    this.setState({selectedChallengeType: selectedChallengeType})
  }

  render() {
    const errors = buildFormErrors(this.props.errors)
    const blacklistKeys = []
    let mergedChallengeBody
    if (this.state.selectedChallengeType) {
      mergedChallengeBody = Object.assign({}, defaultChallenge, {body: this.state.selectedChallengeType.template_data})
    } else {
      mergedChallengeBody = defaultChallenge
    }
    return (
      <div>
        {errors}
        <pre>{JSON.stringify(mergedChallengeBody)}</pre>
        <form onSubmit={ this.props.handleSubmit }>
          <div className="form-group">
            <label>Challenge Type Id</label>
            <Field onChange={this.handleChallengeTypeChange.bind(this)} className="form-control" name="challenge_type_id" component="select" type="text">
              <option value=""></option>
              {
                this.state.challengeTypes.map((challengeType, index) => {
                  return <option key={index} value={challengeType.id}>{capitalizeWords(snakeCaseToSpaceCase(challengeType.name))}</option>
                })
              }
            </Field>
            {
              buildFormFields(mergedChallengeBody, blacklistKeys)
            }
          </div>
          <button className="btn btn-primary btn-block" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

ChallengeForm = reduxForm({
  form: 'course'
})(ChallengeForm)


export default ChallengeForm
