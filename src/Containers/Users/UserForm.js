import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'


class UserForm extends Component {

  render() {
    return (
      <div>
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
            <Field className="form-control" name="passwordConfirmation" component="input" type="password" />
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
