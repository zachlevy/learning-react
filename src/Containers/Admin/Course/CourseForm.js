import React, { Component } from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { parseApiErrors } from '../../../modules/strings'

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

    return (
      <div>
        {errorsList}
        <form onSubmit={ this.props.handleSubmit }>
          <div className="form-group">
            <label>Title</label>
            <Field className="form-control" name="title" component="input" type="text" />
            <label>Description</label>
            <Field className="form-control" name="description" component="input" type="text" />
            <label>Tags</label>
            <Field normalize={(value) => {return value && value.split(",")}} className="form-control" name="tags" component="input" type="text" />
            <fieldset>
              <label>UI Icon</label>
              <Field className="form-control" name="ui.icon" component="input" type="text" />
              <label>UI Primary Color</label>
              <Field className="form-control" name="ui.primaryColor" component="input" type="text" />
              <label>UI Secondary Color</label>
              <Field className="form-control" name="ui.secondaryColor" component="input" type="text" />
              <label>UI Subtle</label>
              <Field className="form-control" name="ui.subtle" component="input" type="text" />
            </fieldset>
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
