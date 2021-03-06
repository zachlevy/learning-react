import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { buildFormErrors } from '../../../../modules/forms'
import { Field, FieldArray } from 'redux-form'
import { markdownToHTML } from '../../../../modules/strings'
import changeCase from 'change-case'

class FeedbackForm extends Component {

  renderStars({fields}) {
    const starsCount = 10
    const stars = [...Array(starsCount).keys()] // es6 way of doing n times
    return (
      <div className="stars-wrapper">
        <div className="start-scale">1</div>
        <div className="rating">
          {
           stars.map((e, i) => {
             return [
               <Field type="radio" id={`star-${changeCase.snakeCase(fields.name)}-${i}`} name={fields.name} value={`${stars.length - i}`} component="input" />,
               <label className="full" htmlFor={`star-${changeCase.snakeCase(fields.name)}-${i}`} title={`${stars.length - i} out of ${stars.length}`}></label>
             ]
           })
          }
        </div>
        <div className="start-scale">{stars.length}</div>
      </div>
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
                        {markdownToHTML(field.question)}
                        <Field className="form-control border-bottom" name={field.name} component="input" type="text" />
                      </div>
                    )
                  case "stars":
                    return (
                      <div key={index}>
                        {markdownToHTML(field.question)}
                        <br />
                        <FieldArray name={field.name} type="radio" component={this.renderStars} />
                        <br />
                        <br />
                      </div>
                    )
                  case "textarea":
                    return (
                      <div key={index}>
                        {markdownToHTML(field.question)}
                        <Field className="form-control border-bottom" name={field.name} component="textarea" type="text" rows="3" />
                      </div>
                    )
                  case "checkbox":
                    return (
                      <div key={index}>
                        <br />
                        <label htmlFor={field.name}>{markdownToHTML(field.question)}</label>
                        <div>
                          <Field
                            name={field.name}
                            id={field.name}
                            component="input"
                            type="checkbox"
                          />
                        </div>
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
