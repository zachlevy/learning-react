import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, FormGroup, Label, Input, Alert } from 'reactstrap'

class Feedback extends Component {
  constructor() {
    super()
    this.state = {
      source: "",
      alert: "",
      name: "",
      text: "",
      respond: false
    }
  }
  handleFormSubmit() {
    console.log("handleFormSubmit")
    fetch(`${process.env.REACT_APP_API_URL}/feedbacks`, {
      method: 'post',
      body: JSON.stringify({
        feedback: {
          body: {
            name: this.state.name,
            text: this.state.text,
            respond: this.state.respond
          },
          source: this.state.source
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
    console.log(field, e)
    console.log(this.state)
    this.setState({[field]: e.target.checked})
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
                  <Label for="email">Email</Label>
                  <Input onKeyUp={this.handleKeyUp.bind(this, "source")} type="email" name="email" id="email" placeholder="" />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input onKeyUp={this.handleKeyUp.bind(this, "name")} type="text" name="name" id="name" placeholder="" />
                </FormGroup>
                <FormGroup>
                  <Label for="message">Message</Label>
                  <Input onKeyUp={this.handleKeyUp.bind(this, "text")} type="textarea" name="message" id="message" />
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input onChange={this.handleKeyUp.bind(this, "respond")} type="checkbox" />{' '}
                    I would like a response
                  </Label>
                </FormGroup>

                <button className="btn btn-primary" onClick={this.handleFormSubmit.bind(this)}>Submit</button>
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
