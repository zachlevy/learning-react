import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { secondsToMinutes } from '../../../modules/time'
import YouTube from 'react-youtube'
import { track } from '../../../modules/analytics'

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
              <YouTube
                videoId={content.youtube_id}
                id={""}
                className={"embed-responsive-item"}
                opts={{ playerVars: {
                  autoplay: 0,
                  modestbranding: 1,
                  showinfo: 0,
                  controls: 0,
                  iv_load_policy: 3
                }}}
                onReady={(e) => {track("Ready YouTube Video", {name: "YouTube Video", action: "Ready", challengeId: this.props.challengeId, content: content})}}
                onPlay={(e) => {track("Play YouTube Video", {name: "YouTube Video", action: "Play", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onPause={(e) => {track("Pause YouTube Video", {name: "YouTube Video", action: "Pause", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onEnd={(e) => {track("End YouTube Video", {name: "YouTube Video", action: "End", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onError={(e) => {track("Error YouTube Video", {name: "YouTube Video", action: "Error", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onStateChange={(e) => {console.log("onStateChange")}}
                onPlaybackRateChange={(e) => {track("PlaybackRateChange YouTube Video", {name: "YouTube Video", action: "PlaybackRateChange", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onPlaybackQualityChange={(e) => {track("PlaybackQualityChange YouTube Video", {name: "YouTube Video", action: "PlaybackQualityChange", challengeId: this.props.challengeId, content: content, data: e.data})}}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <button role="button" className="btn btn-outline-secondary" onClick={this.props.handleSkipClick.bind(this)}>Skip</button>
              &nbsp;
              <button role="button" className="btn btn-secondary" onClick={this.props.handleNextClick.bind(this)}>Next</button>
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
