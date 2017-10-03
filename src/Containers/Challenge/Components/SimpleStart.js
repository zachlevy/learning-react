import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

class SimpleStart extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.course.flow && nextProps.course.flow) {
      this.props.handleShowNextButton()
    }
  }
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
          <div className="col-12">
            <div className="simple_start-start text-center">
              <br />
              <h1>{this.props.course.title}</h1>
              <br />
              <br />
              <h1 className="simple_start-icon"><FontAwesome name={this.props.course.ui && this.props.course.ui.icon} /></h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3 text-center">
            <br />
            <br />
            <p>{this.props.course.description}</p>
            <button className="btn btn-outline-secondary btn-lg btn-pointer" onClick={this.props.handleNextClick.bind(this)}>Start</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  course: state.course
})

SimpleStart.propTypes = {

  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string,
  submitChallengeResponse: PropTypes.func
}


export default connect(
  mapStateToProps
)(SimpleStart)
