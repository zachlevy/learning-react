import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SimpleSignup extends Component {
  constructor() {
    super()
    this.state = {
      email: ""
    }
  }
  assert(event) {
    console.log()
    this.submitSignup(this.state.email)
  }

  // submit to api for analysis
  submitSignup(inputEmail) {
    fetch(`${process.env.REACT_APP_API_URL}/feedbacks`, {
      method: 'post',
      body: JSON.stringify({
        feedback: {
          input: {
            email: inputEmail
          },
          challenge_id: this.props.challengeId,
          user_id: 1
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
    })
  }

  handleKeyUp(e) {
    this.setState({email: e.target.value})
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm-2 text-center">
            <br />
            <br />
            <p>{this.props.question}</p>
            <div className="form-group">
              <input className="form-control border-bottom" onKeyUp={this.handleKeyUp.bind(this)} placeholder="email@example.com" />
            </div>
            <br />
            <button className="btn btn-primary" onClick={this.assert.bind(this)}>{this.props.buttonText}</button>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <button className="btn btn-secondary" onClick={this.props.handleSkipClick.bind(this)}>Skip</button>
              &nbsp;
              <button className={"btn btn-primary" + (this.props.showNextButton ? "" : " disabled")} onClick={this.props.showNextButton && this.props.handleNextClick.bind(this)}>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SimpleSignup.propTypes = {
  question: PropTypes.string,
  buttonText: PropTypes.string,

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number
}

export default SimpleSignup
