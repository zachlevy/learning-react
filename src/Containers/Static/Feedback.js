import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { track } from '../../modules/analytics'
import { apiRequest } from '../../modules/data'

class Feedback extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      alert: "",
      name: "",
      text: "",
      respond: false
    }
  }
  handleFormSubmit(e) {
    e.preventDefault()
    track("Submit Feedback", {
      name: "Feedback",
      action: "Submit",
      data: this.state
    })
    apiRequest("/feedbacks", {
      method: 'post',
      body: JSON.stringify({
        feedback: {
          body: {
            name: this.state.name,
            text: this.state.text,
            respond: this.state.respond,
            email: this.state.email
          },
          source: "feedback_form"
        }
      })
    }, (response) => {
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

  handleOnBlur(e) {
    track("Blur Feedback", {
      action: "Blur",
      name: e.target.name,
      input: e.target.name
    })
  }

  handleOnFocus(e) {
    track("Focus Feedback", {
      action: "Focus",
      name: e.target.name,
      input: e.target.name
    })
  }

  render(){
    let alert
    if (this.state.alert) {
      alert = <Alert color="success">{this.state.alert}</Alert>
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <br />
              <h3>Feedback</h3>
              <p>We love feedback. Our goal is to make Vora the best way to learn. Any suggestions for how to do this better are very welcome.</p>
              {alert}
              <Form>
                <FormGroup>
                  <Label for="message">Message</Label>
                  <Input onFocus={this.handleOnFocus.bind(this)} onBlur={this.handleOnBlur.bind(this)} onKeyUp={this.handleKeyUp.bind(this, "text")} type="textarea" name="message" id="message" rows="5" />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input onFocus={this.handleOnFocus.bind(this)} onBlur={this.handleOnBlur.bind(this)} onKeyUp={this.handleKeyUp.bind(this, "email")} type="email" name="email" id="email" placeholder="" />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input onFocus={this.handleOnFocus.bind(this)} onBlur={this.handleOnBlur.bind(this)} onKeyUp={this.handleKeyUp.bind(this, "name")} type="text" name="name" id="name" placeholder="" />
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input onChange={this.handleKeyUp.bind(this, "respond")} type="checkbox" />{' '}
                    Would you like us to respond?
                  </Label>
                </FormGroup>

                <button className="btn btn-primary btn-pointer" onClick={this.handleFormSubmit.bind(this)}>Submit</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url)
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Feedback)
