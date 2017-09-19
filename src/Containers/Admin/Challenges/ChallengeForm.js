import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, FieldArray, change } from 'redux-form'
import { parseApiErrors } from '../../../modules/strings'
import { defaultChallenge } from '../../../modules/defaults'
import { apiRequest } from '../../../modules/data'
import { buildFormFields, buildFormErrors } from '../../../modules/forms'
import { snakeCaseToSpaceCase, capitalizeWords } from '../../../modules/strings'
import getChallengeComponent from '../../Challenge/Components'
import { gradientBackground } from '../../../modules/styles'
import Uploader from '../Uploader'

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
      // simulate changing challenge type for editing a challenge
      if (this.props.course) {
        this.handleChallengeTypeChange({target: {value: this.props.initialValues.challenge_type_id}})
      }
    })
  }

  handleChallengeTypeChange(e) {
    const selectedChallengeType = this.state.challengeTypes.find((challengeType) => {return challengeType.id == e.target.value})
    this.setState({selectedChallengeType: selectedChallengeType})
  }

  render() {
    const errors = buildFormErrors(this.props.errors)
    const blacklistKeys = []
    let mergedChallenge
    if (this.state.selectedChallengeType) {
      mergedChallenge = Object.assign({}, defaultChallenge, {body: this.state.selectedChallengeType.template_data})
    } else {
      mergedChallenge = defaultChallenge
    }
    let mergedChallengeBody
    console.log("mergedChallengeBody", mergedChallenge.body, this.props.challengeForm && this.props.challengeForm.values && this.props.challengeForm.values.body)
    mergedChallengeBody = Object.assign({}, mergedChallenge.body, (this.props.challengeForm && this.props.challengeForm.values &&  this.props.challengeForm.values.body) || {})
    return (
      <div className="row">
        <div className="col-12 col-sm-3">
          {errors}
          <form onSubmit={ this.props.handleSubmit }>
            <div className="form-group">
              <br />
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
                buildFormFields(mergedChallenge, blacklistKeys, (key, url) => {
                  this.props.reduxChange("challenge", key, url)
                })
              }
            </div>
            <button className="btn btn-primary btn-block" type="submit">Submit</button>
          </form>
        </div>
        <div className="col-12 col-sm-9 bg-gradient bg-subtle bg-subtle-diamond" style={gradientBackground("#000000", "#333333")}>
          {
            this.state.selectedChallengeType && mergedChallenge && getChallengeComponent(
              this.state.selectedChallengeType.name,
              Object.assign(
                {},
                mergedChallengeBody,
                {
                  handleInsertDependencies: () => {},
                  handleBackButton: () => {},
                  handleNextClick: () => {},
                  handleSkipClick: () => {},
                  showNextButton: false,
                  handleShowNextButton: () => {},
                  challengeId: 0,
                  challengeDescription: this.props.challengeForm.values && this.props.challengeForm.values.description || mergedChallenge.description
                }
              )
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challengeForm: state.form.challenge
})

const mapDispatchToProps = dispatch => bindActionCreators({
  reduxChange: change
}, dispatch)

ChallengeForm = reduxForm({
  form: 'challenge'
})(ChallengeForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChallengeForm)


// export default ChallengeForm
