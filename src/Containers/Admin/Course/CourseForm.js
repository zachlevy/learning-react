import React, { Component } from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { parseApiErrors } from '../../../modules/strings'
import { defaultCourse } from '../../../modules/defaults'
import { buildFormFields, buildFormErrors } from '../../../modules/forms'

class CourseForm extends Component {
  render() {
    const errors = buildFormErrors(this.props.errors)
    const blacklistKeys = ["est_duration", "flow"]
    return (
      <div>
        {errors}
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
