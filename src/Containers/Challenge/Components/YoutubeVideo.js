import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { secondsToMinutes } from '../../../modules/time'
import YouTube from 'react-youtube'
import { track } from '../../../modules/analytics'
import FontAwesome from 'react-fontawesome'

class YoutubeVideo extends Component {
  constructor() {
    super()
    this.state = {
      showHelp: false,
      playbackRate: 1
    }
    this.videoPlayer
  }

  assert(event) {
    console.log("assert")
  }

  handleSeek(seekTime) {
    const currentTime = this.videoPlayer.getCurrentTime()
    this.videoPlayer.seekTo(currentTime + seekTime)
  }

  handlePlaybackChange(newRate) {
    console.log("newRate", newRate)
    const playbackRates = [0.5, 1, 1.5, 2]
    if (newRate < playbackRates[0]) {
      newRate = playbackRates[0]
    } else if (newRate > playbackRates[playbackRates.length - 1]) {
      newRate = playbackRates[playbackRates.length - 1]
    }
    console.log("newRate", newRate)
    this.videoPlayer.setPlaybackRate(newRate)
  }

  handleOnReady(e) {
    track("Ready YouTube Video", {name: "YouTube Video", action: "Ready", challengeId: this.props.challengeId, content: this.props})
    this.videoPlayer = e.target
  }

  handleOnPlaybackRateChange(e) {
    (e) => {track("PlaybackRateChange YouTube Video", {name: "YouTube Video", action: "PlaybackRateChange", challengeId: this.props.challengeId, content: this.props, data: e.data})}
    this.setState({playbackRate: e.target.getPlaybackRate()})
  }

  render() {
    console.log("ok")
    const content = this.props
    let help
    if (this.state.showHelp) {
      help = (
        <li className="list-inline-item">
          <p className="challenge-description">{this.props.challengeDescription}</p>
        </li>
      )
    } else {
      help = (
        <li className="list-inline-item">
          <button role="button" className="btn btn-link" onClick={e => this.setState({showHelp: true})}>help <FontAwesome name="question-circle" /></button>
        </li>
      )
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">{content.title}</h2>
            <p className="text-center">{secondsToMinutes(content.est_duration)} min</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
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
                  iv_load_policy: 3,
                  start: content.start_seconds,
                  end: content.end_seconds
                }}}
                onReady={this.handleOnReady.bind(this)}
                onPlay={(e) => {track("Play YouTube Video", {name: "YouTube Video", action: "Play", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onPause={(e) => {track("Pause YouTube Video", {name: "YouTube Video", action: "Pause", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onEnd={(e) => {track("End YouTube Video", {name: "YouTube Video", action: "End", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onError={(e) => {track("Error YouTube Video", {name: "YouTube Video", action: "Error", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onStateChange={(e) => {console.log("onStateChange")}}
                onPlaybackRateChange={this.handleOnPlaybackRateChange.bind(this)}
                onPlaybackQualityChange={(e) => {track("PlaybackQualityChange YouTube Video", {name: "YouTube Video", action: "PlaybackQualityChange", challengeId: this.props.challengeId, content: content, data: e.data})}}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <div className="float-md-left">
              <br />
              <ul className="list-inline">
                <li className="list-inline-item">
                  <button role="button" className="btn btn-outline-secondary btn-sm" onClick={this.handleSeek.bind(this, -30)}><FontAwesome name="undo" /> <span>30s</span></button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className="btn btn-outline-secondary btn-sm" onClick={this.handlePlaybackChange.bind(this, this.state.playbackRate - 0.5)}><FontAwesome name="fast-backward" /></button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-outline-secondary btn-sm disabled">{this.state.playbackRate}x</button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className="btn btn-outline-secondary btn-sm" onClick={this.handlePlaybackChange.bind(this, this.state.playbackRate + 0.5)}><FontAwesome name="fast-forward" /></button>
                </li>
              </ul>
            </div>
            <div className="float-md-right">
              <br />
              <ul className="list-inline">
                {help}
                <li className="list-inline-item">
                  <button role="button" className="btn btn-link" onClick={this.props.handleSkipClick.bind(this)}>Skip</button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className="btn btn-outline-secondary btn-lg" onClick={this.props.handleNextClick.bind(this)}>Next</button>
                </li>
              </ul>
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
  start_seconds: PropTypes.number,
  end_seconds: PropTypes.number,

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}

export default YoutubeVideo
