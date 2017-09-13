import React, { Component } from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { parseApiErrors } from '../../../modules/strings'
import { defaultChallenge } from '../../../modules/defaults'
import { buildFormFields, buildFormErrors } from '../../../modules/forms'

class ChallengeForm extends Component {
  render() {
    const errors = buildFormErrors(this.props.errors)
    const blacklistKeys = []
    return (
      <div>
        {errors}
        <form onSubmit={ this.props.handleSubmit }>
          <div className="form-group">
            {
              buildFormFields(defaultChallenge, blacklistKeys)
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
