import React, { Component } from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { parseApiErrors } from '../../../modules/strings'
import { defaultChallenge } from '../../../modules/defaults'
import { apiRequest } from '../../../modules/data'
import { buildFormFields, buildFormErrors } from '../../../modules/forms'
import { snakeCaseToSpaceCase, capitalizeWords } from '../../../modules/strings'
import getChallengeComponent from '../../Challenge/Components'

class ChallengeForm extends Component {
  constructor() {
    super()
    this.state = {
      challengeTypes: [],
      selectedChallengeType: null
    }
  }

  componentDidMount() {
    apiRequest(`/challenge_types`, {
    }, (response, status) => {
      console.log("challenge_types", response)
      this.setState({challengeTypes: response})
    })
  }

  handleChallengeTypeChange(e) {
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
      <div className="row">
        <div className="col-12 col-sm-3">
          {errors}
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
        <div className="col-12 col-sm-9">
          {
            this.state.selectedChallengeType && mergedChallengeBody && getChallengeComponent(
              this.state.selectedChallengeType.name,
              Object.assign(
                {},
                mergedChallengeBody.body,
                {
                  handleInsertDependencies: () => {},
                  handleBackButton: () => {},
                  handleNextClick: () => {},
                  handleSkipClick: () => {},
                  showNextButton: false,
                  handleShowNextButton: () => {},
                  challengeId: 0,
                  challengeDescription: this.props.challengeForm && this.props.challengeForm.values.description
                }
              )
            )
          }
        </div>
      </div>
    )
  }
}

ChallengeForm = reduxForm({
  form: 'challenge'
})(ChallengeForm)


export default ChallengeForm
