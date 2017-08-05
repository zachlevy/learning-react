import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

class ExternalSuggestionEnd extends Component {
  handleExternalContentClick(url) {
    console.log("handleButtonClick")
    window.open(url, '_blank')
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <h3 className="text-center">Want to dive deeper?</h3>
            <br />
          </div>
        </div>
        <div className="row">
          {
            this.props.external_contents && this.props.external_contents.map((content, index) => {
              return (
                <div className="col-4 text-center">
                  <button className="btn btn-outline-secondary btn-block btn-pointer" onClick={this.handleExternalContentClick.bind(this, content.external_url)}>
                    <br />
                    <br />
                    <h1><FontAwesome name={content.icon} /></h1>
                    <p>{content.text}</p>
                    <br />
                    <br />
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

ExternalSuggestionEnd.propTypes = {

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string,
  external_contents: PropTypes.array
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),

}, dispatch)


export default connect(
  null,
  mapDispatchToProps
)(ExternalSuggestionEnd)
