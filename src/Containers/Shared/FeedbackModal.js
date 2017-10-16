import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, FormGroup, Label, Input, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { track } from '../../modules/analytics'
import { setFeedback, clearFeedback, setFeedbackModal } from '../../modules/redux/feedback'
import { apiRequest } from '../../modules/data'
import { buildFormErrors } from '../../modules/forms'
import { reset } from 'redux-form'
import FeedbackForm from '../Challenge/Components/Feedback/FeedbackForm'

class FeedbackModal extends Component {
  constructor() {
    super()
    this.state = {
      errors: []
    }
  }

  toggle() {
    this.props.setFeedbackModal(!this.props.feedback.modal)
  }

  handleSubmit(feedbackValues) {
    // create user
    apiRequest("/feedbacks", {
      method: 'post',
      body: JSON.stringify({
        feedback: {
          source: "feedback_modal",
          body: Object.assign({context: this.props.feedback.context}, feedbackValues)
        }
      })
    }, (response, status) => {
      if (status === 201) {
        this.setState({errors: {success: ["Thanks for the feedback!"]}})
        this.props.clearFeedbackForm()
      } else {
        this.setState({errors: response})
      }
    })
  }

  render(){
    const errors = buildFormErrors(this.props.errors)
    return (
      <div>
        <Modal isOpen={this.props.feedback.modal} toggle={this.toggle.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggle.bind(this)}>Got Feedback?</ModalHeader>
          <ModalBody>
            <p>We love feedback. Our goal is to make Vora the smartest way to learn. Any suggestions for how to do this better are very welcome.</p>
            {errors}
            <FeedbackForm
              onSubmit={this.handleSubmit.bind(this)}
              errors={this.state.errors}
              fields={this.props.feedback.messaging}
              submitButtonClass="btn btn-primary btn-lg"
              submitButtonText="Submit"
            />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

FeedbackModal.propTypes = {
}

const mapStateToProps = state => ({
  feedback: state.feedback
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setFeedback,
  clearFeedback,
  setFeedbackModal,
  clearFeedbackForm: () => reset('feedback')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackModal)
