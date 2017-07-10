import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SuggestionEnd extends Component {
  render() {
    const content = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">{content.title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm-2">
            <h1>End</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <button className="btn btn-secondary" onClick={this.props.handleSkipClick.bind(this)}>Skip</button>
              &nbsp;
              <button className="btn btn-primary" onClick={this.props.handleNextClick.bind(this)}>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SuggestionEnd.propTypes = {

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number
}

export default SuggestionEnd
