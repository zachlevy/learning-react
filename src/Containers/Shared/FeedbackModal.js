import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, FormGroup, Label, Input, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { track } from '../../modules/analytics'
import { setFeedback, clearFeedback, setFeedbackModal } from '../../modules/redux/feedback'

class FeedbackModal extends Component {
  constructor() {
    super()
    this.state = {
      alert: "",
      text: ""
    }
  }

  toggle() {
    this.props.setFeedbackModal(!this.props.feedback.modal)
  }

  handleFormSubmit(e) {
    e.preventDefault()
    console.log("handleFormSubmit")
    track("Submit Feedback", {
      name: "Feedback",
      action: "Submit",
      data: this.state
    })
    fetch(`${process.env.REACT_APP_API_URL}/feedbacks`, {
      method: 'post',
      body: JSON.stringify({
        feedback: {
          body: {
            text: this.state.text,
            context: this.props.feedback
          },
          source: "feedback_form_modal"
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      this.setState({alert: "Thanks for your feedback"})
    })
  }
  handleKeyUp(field, e) {
    if(e.target.checked) {
      this.setState({[field]: e.target.checked})
    } else {
      this.setState({[field]: e.target.value})
    }
  }

  render(){
    let alert
    if (this.state.alert) {
      alert = <Alert color="success">{this.state.alert}</Alert>
    }
    return (
      <div>
        <Modal isOpen={this.props.feedback.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Disagree?</ModalHeader>
          <ModalBody>
            <p>We love feedback. Our goal is to make Vora the smartest way to learn. Any suggestions for how to do this better are very welcome.</p>
            {alert}
            <Form>
              <FormGroup>
                <Label for="message">What makes you disagree?</Label>
                <Input onKeyUp={this.handleKeyUp.bind(this, "text")} type="textarea" name="message" id="message" rows="5" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <button role="button" className="btn btn-primary" onClick={this.handleFormSubmit.bind(this)}>Submit</button>
            <button role="button" className="btn btn-secondary" onClick={this.toggle.bind(this)}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

FeedbackModal.propTypes = {
  callToAction: PropTypes.string,
  context: PropTypes.object
}

const mapStateToProps = state => ({
  feedback: state.feedback
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setFeedback,
  clearFeedback,
  setFeedbackModal
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackModal)
