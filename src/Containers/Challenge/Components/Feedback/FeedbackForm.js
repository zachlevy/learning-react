import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { buildFormErrors } from '../../../../modules/forms'
import { Field, Input, FieldArray } from 'redux-form'

class FeedbackForm extends Component {

  renderStars({fields}) {
    return (
      <fieldset className="rating">
        <Field type="radio" id="star5" name={fields.name} value="5" component="input" /><label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>
        <Field type="radio" id="star4" name={fields.name} value="4" component="input" /><label className="full" htmlFor="star4" title="Pretty good - 4 stars"></label>
        <Field type="radio" id="star3" name={fields.name} value="3" component="input" /><label className="full" htmlFor="star3" title="Meh - 3 stars"></label>
        <Field type="radio" id="star2" name={fields.name} value="2" component="input" /><label className="full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
        <Field type="radio" id="star1" name={fields.name} value="1" component="input" /><label className="full" htmlFor="star1" title="Sucks big time - 1 star"></label>
      </fieldset>
    )
  }

  render() {
    const errors = buildFormErrors(this.props.errors)
    return (
      <div>
        {errors}
        <form onSubmit={ this.props.handleSubmit }>
          <div className="form-group">
            {
              this.props.fields.map((field, index) => {
                switch (field.inputType) {
                  case "input":
                    return (
                      <div key={index}>
                        <label>{field.question}</label>
                        <Field className="form-control border-bottom" name={field.name} component="input" type="text" />
                      </div>
                    )
                  case "stars":
                    return (
                      <div key={index}>
                        <label>{field.question}</label>
                        <br />
                        <FieldArray name={field.name} type="radio" component={this.renderStars.bind(field.name)} />
                        <br />
                        <br />
                      </div>
                    )
                  case "textarea":
                    return (
                      <div key={index}>
                        <label>{field.question}</label>
                        <Field className="form-control border-bottom" name={field.name} component="textarea" type="text" rows="3" />
                      </div>
                    )
                  default:
                    return null
                }

              })
            }
          </div>
          <button className={this.props.submitButtonClass} type="submit">{this.props.submitButtonText}</button>
        </form>
      </div>
    )
  }
}

FeedbackForm = reduxForm({
  form: 'feedback'
})(FeedbackForm)

FeedbackForm.propTypes = {
  submitButtonText: PropTypes.string,
  submitButtonClass: PropTypes.string
}

export default FeedbackForm
