import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { secondsToMinutes } from '../../../modules/time'

class WikipediaNotes extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  assert() {
    console.log("assert")
    console.log(this.state.input)
    if (this.state.input && this.state.input.length >= 10) {
      this.props.handleShowNextButton()
    }
  }

  handleKeyUp(e) {
    this.setState({input: e.target.value})
    this.assert()
  }

  render() {
    console.log("ok")
    const content = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">{content.title}</h2>
            <p className="text-center">{secondsToMinutes(content.est_duration)} min</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="">
              <iframe className="wikipedia wikpedia-notes" src={content.embed_url} frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="form-group">
              <label htmlFor="notes">Your Notes</label>
              <textarea className="form-control" id="notes" rows="15" onKeyUp={this.handleKeyUp.bind(this)}></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <button className="btn btn-secondary" onClick={this.props.handleSkipClick.bind(this)}>Skip</button>
              &nbsp;
              <button className={"btn btn-primary" + (this.props.showNextButton ? "" : " disabled")} onClick={this.props.showNextButton && this.props.handleNextClick.bind(this)}>Next</button>
              <pre>{this.props.showNextButton}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

WikipediaNotes.propTypes = {
  embed_url: PropTypes.string,
  title: PropTypes.string,
  est_duration: PropTypes.number,

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number
}

export default WikipediaNotes
