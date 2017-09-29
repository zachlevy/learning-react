import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
            <Field className="form-control border-bottom" name="email" component="input" type="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <Field className="form-control border-bottom" name="password" component="input" type="password" />
          </div>
          <div className="form-group">
            <label>Password Confirmation</label>
            <Field className="form-control border-bottom" name="password_confirmation" component="input" type="password" />
          </div>
          <button className={this.props.submitButtonClass} type="submit">{this.props.submitButtonText}</button>
        </form>
      </div>
    )
  }
}

UserForm = reduxForm({
  form: 'user'
})(UserForm)

UserForm.propTypes = {
  submitButtonText: PropTypes.string,
  submitButtonClass: PropTypes.string
}

export default UserForm
