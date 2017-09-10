import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'


class UserForm extends Component {

  render() {
    return (
      <div>
        <form onSubmit={ this.props.handleSubmit }>
          <Field name="email" component="input" type="email" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

UserForm = reduxForm({
  form: 'user'
})(UserForm)


export default UserForm
