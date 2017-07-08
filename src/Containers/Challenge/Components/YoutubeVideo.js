import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { secondsToMinutes } from '../../../modules/time'

class YoutubeVideo extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  assert(event) {
    console.log("assert")
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
          <div className="col-12 col-sm-8 offset-sm-2">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src={content.embed_url} frameBorder="0" allowFullScreen></iframe>
            </div>
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

YoutubeVideo.propTypes = {
  embed_url: PropTypes.string,
  title: PropTypes.string,
  est_duration: PropTypes.number,

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number
}

export default YoutubeVideo
