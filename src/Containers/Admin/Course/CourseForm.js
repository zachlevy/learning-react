import React, { Component } from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { parseApiErrors } from '../../../modules/strings'
import { defaultCourse } from '../../../modules/defaults'
import { buildFormFields } from '../../../modules/forms'

class CourseForm extends Component {
  render() {
    const errors = parseApiErrors(this.props.errors)
    let errorsList
    if (errors.length > 0) {
      errorsList = (
        <ul>
          {
            errors.map((error, index) => {
              return <li key={index}>{error}</li>
            })
          }
        </ul>
      )
    }
    const blacklistKeys = ["est_duration", "flow"]
    return (
      <div>
        {errorsList}
        <form onSubmit={ this.props.handleSubmit }>
          <div className="form-group">
            {
              buildFormFields(defaultCourse, blacklistKeys)
            }
          </div>
          <button className="btn btn-primary btn-block" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

CourseForm = reduxForm({
  form: 'course'
})(CourseForm)


export default CourseForm
