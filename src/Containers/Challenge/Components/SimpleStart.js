import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

class SimpleStart extends Component {
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
          <div className="col-12 text-center">
            <br />
            <br />
            <button role="button" className="btn btn-outline-secondary btn-lg" onClick={this.props.handleNextClick.bind(this)}>Start</button>
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

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}


export default connect(
  mapStateToProps
)(SimpleStart)
