import React, { Component } from 'react'

class AttemptThumb extends Component {
  render() {
    let inputText
    if (typeof this.props.input.text === "object") {
      inputText = this.props.input.text.join(", ")
    } else if (typeof this.props.input.text === "string") {
      inputText = this.props.input.text
    } else {
      inputText = "No Answer"
    }
    return (
      <div className="row">
        <div className="col-12">
          <blockquote className="blockquote">
            <h4>Question</h4>
            <p>{this.props.challenge.body.question || "None"}</p>
            <h4>Your Answer</h4>
            <p>{inputText || "None"}</p>
            <p>{new Date(Date.parse(this.props.created_at)).toUTCString()}</p>
          </blockquote>
        </div>
      </div>
    )
  }
}

AttemptThumb.propTypes = {

}

export default AttemptThumb
