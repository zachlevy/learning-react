import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { secondsToMinutes } from '../../../../modules/time'
import YouTube from 'react-youtube'
import { track } from '../../../../modules/analytics'
import FontAwesome from 'react-fontawesome'
import { getYouTubeVideoDuration, secondsToHalfMinutes } from '../../../../modules/time'
import YoutubeCaptions from './Captions'

class YoutubeVideo extends Component {
  constructor() {
    super()
    this.state = {
      showHelp: false,
      playbackRate: 1,
      videoDuration: 0,
      currentTime: 0,
    }
    this.videoPlayer
  }

  componentDidMount() {
    console.log("componentDidMount")
    console.log("this.props.captions", this.props.captions)
  }

  componentWillUnmount() {
    console.log("componentWillUnmount")
    clearInterval(this.state.playbackInterval);
  }

  assert(event) {
    console.log("assert")
  }

  handleSeek(seekTime) {
    const currentTime = this.videoPlayer.getCurrentTime()
    let seekToTime = currentTime + seekTime
    if (seekToTime < this.props.start_seconds) {
      seekToTime = this.props.start_seconds
    } else if (seekToTime > this.props.end_seconds) {
      seekToTime = this.props.end_seconds
    }
    this.videoPlayer.seekTo(seekToTime)
    track("Seek YouTube Video", {name: "YouTube Video", action: "Seek", challengeId: this.props.challengeId, content: this.props, seekTo: currentTime + seekTime})
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
    const duration = this.videoPlayer.getDuration()
    console.log(duration)
    this.setState({videoDuration: getYouTubeVideoDuration(duration, this.props.start_seconds, this.props.end_seconds)})
    this.setState({playbackInterval: setInterval(() => { this.setState({currentTime: this.videoPlayer.getCurrentTime()}) }, 500)})
  }

  handleOnPlaybackRateChange(e) {
    track("PlaybackRateChange YouTube Video", {name: "YouTube Video", action: "PlaybackRateChange", challengeId: this.props.challengeId, content: this.props, data: e.data})
    this.setState({playbackRate: e.target.getPlaybackRate()})
  }

  handleOnEnd(e) {
    this.props.handleShowNextButton()
    track("End YouTube Video", {
      name: "YouTube Video",
      action: "End",
      challengeId: this.props.challengeId,
      content: this.props,
      data: e.data
    })
  }

  handleShowHelp(e) {
    track("Show Help", {
      name: "Help",
      action: "Show",
      challengeId: this.props.challengeId,
      content: this.props
    })
    this.setState({showHelp: true})
  }

  handleNextClick(e) {
    track("Attempt Next", {
      name: "Next",
      action: "Attempt",
      challengeId: this.props.challengeId,
      content: this.props,
      showHelp: this.state.showHelp,
      showNextButton: this.props.showNextButton,
      eventLabel: "showNextButton",
      eventValue: this.props.showNextButton ? 1 : 0
    })
    if (this.props.showNextButton) {
      this.props.handleNextClick()
    } else {
      this.setState({showHelp: true})
    }
  }

  render() {
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
          <button role="button" className="btn btn-link" onClick={this.handleShowHelp.bind(this)}>help <FontAwesome name="question-circle" /></button>
        </li>
      )
    }
    let captions
    if (this.props.load_captions) {
      captions = (
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <YoutubeCaptions captions={this.props.captions} currentTime={this.state.currentTime} />
          </div>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <br />
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
                  rel: 0,
                  iv_load_policy: 3,
                  start: content.start_seconds,
                  end: content.end_seconds
                }}}
                onReady={this.handleOnReady.bind(this)}
                onPlay={(e) => {track("Play YouTube Video", {name: "YouTube Video", action: "Play", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onPause={(e) => {track("Pause YouTube Video", {name: "YouTube Video", action: "Pause", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onEnd={this.handleOnEnd.bind(this)}
                onError={(e) => {track("Error YouTube Video", {name: "YouTube Video", action: "Error", challengeId: this.props.challengeId, content: content, data: e.data})}}
                onStateChange={(e) => {console.log("onStateChange")}}
                onPlaybackRateChange={this.handleOnPlaybackRateChange.bind(this)}
                onPlaybackQualityChange={(e) => {track("PlaybackQualityChange YouTube Video", {name: "YouTube Video", action: "PlaybackQualityChange", challengeId: this.props.challengeId, content: content, data: e.data})}}
              />
            </div>
          </div>
        </div>
        {captions}
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <div className="float-md-left">
              <br />
              <ul className="list-inline">
                <li className="list-inline-item">
                  <button role="button" className="btn btn-outline-secondary btn-sm" onClick={this.handleSeek.bind(this, -10)}><FontAwesome name="undo" /> <span>10s</span></button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className="btn btn-outline-secondary btn-sm" onClick={this.handlePlaybackChange.bind(this, this.state.playbackRate - 0.5)}><FontAwesome name="backward" /></button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-sm disabled">{this.state.playbackRate}x</button>
                </li>
                <li className="list-inline-item">
                  <button role="button" className="btn btn-outline-secondary btn-sm" onClick={this.handlePlaybackChange.bind(this, this.state.playbackRate + 0.5)}><FontAwesome name="forward" /></button>
                </li>
              </ul>
            </div>
            <div className="float-md-right">
              <br />
              <p className="challenge-description">{this.props.challengeDescription}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 offset-md-2">
          <ul className="list-inline float-md-right">
            <li className="list-inline-item">
              <span className="btn">{secondsToHalfMinutes(this.state.videoDuration - Math.round(this.state.currentTime))} min remaining</span>
            </li>
            {help}
            <li className="list-inline-item">
              <button role="button" className="btn btn-link" onClick={this.props.handleBackButton.bind(this)}><span>back</span></button>
            </li>
            <li className="list-inline-item">
              <button role="button" className="btn btn-link" onClick={this.props.handleSkipClick.bind(this, this.props.challengeId, this.state.showHelp)}>skip</button>
            </li>
            <li className="list-inline-item">
              <button role="button" className={"btn btn-outline-secondary btn-lg" + (this.props.showNextButton ? "" : " disabled")} onClick={this.handleNextClick.bind(this)}>Next</button>
            </li>
          </ul>
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
  load_captions: PropTypes.bool,
  captions: PropTypes.array,

  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string
}

export default YoutubeVideo
