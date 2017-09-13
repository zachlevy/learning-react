import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { parseApiErrors } from '../../modules/strings'
import { buildFormErrors } from '../../modules/forms'

class UserForm extends Component {
  render() {
    const errors = buildFormErrors(this.props.errors)

    return (
      <div>
        {errors}
        <form onSubmit={ this.props.handleSubmit }>
          <div className="form-group">
            <label>Email</label>
            <Field className="form-control" name="email" component="input" type="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <Field className="form-control" name="password" component="input" type="password" />
          </div>
          <div className="form-group">
            <label>Password Confirmation</label>
            <Field className="form-control" name="password_confirmation" component="input" type="password" />
          </div>
          <button className="btn btn-primary btn-block" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

UserForm = reduxForm({
  form: 'user'
})(UserForm)


export default UserForm
