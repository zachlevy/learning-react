import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

// used to render the course thumbnails in course lists
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
          <p>Question: {this.props.challenge.body.question}</p>
          <p>Answer: {inputText}</p>
        </div>
      </div>
    )
  }
}

AttemptThumb.propTypes = {

}

export default AttemptThumb
