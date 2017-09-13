import React, { Component } from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { parseApiErrors } from '../../../modules/strings'
import { defaultCourse } from '../../../modules/defaults'

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
              Object.keys(defaultCourse).filter((key) => {return !blacklistKeys.includes(key)}).map((key) => {
                if (typeof defaultCourse[key] === "string") {
                  return (
                    <div>
                      <label>{key}</label>
                      <Field className="form-control" name={key} component="input" type="text" />
                    </div>
                  )
                } else if (typeof defaultCourse[key] === "number") {
                  return (
                    <div>
                      <label>{key}</label>
                      <Field className="form-control" name={key} component="input" type="number" />
                    </div>
                  )
                } else if (typeof defaultCourse[key] === "object" && defaultCourse[key].length >= 0 && typeof defaultCourse[key][0] === "string") {
                  return (
                    <div>
                      <label>{key}</label>
                      <Field normalize={(value) => {return value && value.split(",")}} className="form-control" name={key} component="input" type="text" />
                    </div>
                  )
                } else {
                  // recursive refactor
                  return Object.keys(defaultCourse[key]).filter((subKey) => {return !blacklistKeys.includes(`${key}.${subKey}`)}).map((subKey) => {
                    if (typeof defaultCourse[key][subKey] === "string") {
                      return (
                        <div>
                          <label>{key} {subKey}</label>
                          <Field className="form-control" name={`${key}.${subKey}`} component="input" type="text" />
                        </div>
                      )
                    }
                  })
                }
              })
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
