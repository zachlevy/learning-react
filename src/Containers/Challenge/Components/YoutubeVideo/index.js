import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import { track } from '../../../../modules/analytics'
import FontAwesome from 'react-fontawesome'
import { getYouTubeVideoDuration, secondsToHalfMinutes } from '../../../../modules/time'
import YoutubeCaptions from './Captions'
import { markdownToHTML } from '../../../../modules/strings'

class YoutubeVideo extends Component {
  constructor() {
    super()
    this.state = {
      showHelp: false,
      playbackRate: 1, // change it once the video loads
      videoDuration: 0,
      currentTime: 0,
    }
    this.videoPlayer = undefined
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    clearInterval(this.state.playbackInterval);
  }

  assert(event) {
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
    track("Seek YouTube Video", {name: "YouTube Video", action: "Seek", challengeId: this.props.challengeId, content: Object.assign({}, this.props, {captions: undefined}), seekTo: currentTime + seekTime})
  }

  handlePlaybackChange(newRate) {
    if (newRate === undefined) {
      // set default
      newRate = 1
    }
    const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2]
    if (newRate < playbackRates[0]) {
      newRate = playbackRates[0]
    } else if (newRate > playbackRates[playbackRates.length - 1]) {
      newRate = playbackRates[playbackRates.length - 1]
    }
    this.videoPlayer.setPlaybackRate(newRate)
  }

  handleOnReady(e) {
    track("Ready YouTube Video", {name: "YouTube Video", action: "Ready", challengeId: this.props.challengeId, content: Object.assign({}, this.props, {captions: undefined})})
    this.videoPlayer = e.target
    const duration = this.videoPlayer.getDuration()
    this.setState({videoDuration: getYouTubeVideoDuration(duration, this.props.start_seconds, this.props.end_seconds)})
    this.setState({playbackInterval: setInterval(() => { this.setState({currentTime: this.videoPlayer.getCurrentTime()}) }, 500)})
    this.handlePlaybackChange(this.props.playback_rate)
  }

  handleOnPlaybackRateChange(e) {
    track("PlaybackRateChange YouTube Video", {name: "YouTube Video", action: "PlaybackRateChange", challengeId: this.props.challengeId, content: Object.assign({}, this.props, {captions: undefined}), data: e.data})
    this.setState({playbackRate: e.target.getPlaybackRate()})
  }

  handleOnEnd(e) {
    this.props.handleShowNextButton()
    track("End YouTube Video", {
      name: "YouTube Video",
      action: "End",
      challengeId: this.props.challengeId,
      content: Object.assign({}, this.props, {captions: undefined}),
      data: e.data
    })
  }

  toggleShowHelp(e) {
    track("Toggle Help", {
      name: "Help",
      action: "Toggle",
      challengeId: this.props.challengeId,
      content: Object.assign({}, this.props, {captions: undefined})
    })
    this.setState({showHelp: !this.state.showHelp})
  }

  handleNextClick(e) {
    track("Attempt Next", {
      name: "Next",
      action: "Attempt",
      challengeId: this.props.challengeId,
      content: Object.assign({}, this.props, {captions: undefined}),
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

  handleOnMouseEnter(e) {
    this.videoPlayer.pauseVideo()
  }

  handleOnMouseLeave(e) {
    this.videoPlayer.playVideo()
  }

  render() {
    const content = this.props
    let help
    help = (
      <li className="list-inline-item">
        <button className="btn btn-link btn-pointer" onClick={this.toggleShowHelp.bind(this)}>help <FontAwesome name="question-circle" /></button>
      </li>
    )
    let captions
    if (this.props.load_captions) {
      captions = (
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <YoutubeCaptions
              captions={this.props.captions}
              currentTime={this.state.currentTime}
              handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
              handleOnMouseLeave={this.handleOnMouseLeave.bind(this)}
            />
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
                  controls: 1,
                  rel: 0,
                  iv_load_policy: 3,
                  start: content.start_seconds,
                  end: content.end_seconds
                }}}
                onReady={this.handleOnReady.bind(this)}
                onPlay={(e) => {track("Play YouTube Video", {name: "YouTube Video", action: "Play", challengeId: this.props.challengeId, content: Object.assign({}, this.props, {captions: undefined}), data: e.data})}}
                onPause={(e) => {track("Pause YouTube Video", {name: "YouTube Video", action: "Pause", challengeId: this.props.challengeId, content: Object.assign({}, this.props, {captions: undefined}), data: e.data})}}
                onEnd={this.handleOnEnd.bind(this)}
                onError={(e) => {track("Error YouTube Video", {name: "YouTube Video", action: "Error", challengeId: this.props.challengeId, content: Object.assign({}, this.props, {captions: undefined}), data: e.data})}}
                onStateChange={(e) => {}}
                onPlaybackRateChange={this.handleOnPlaybackRateChange.bind(this)}
                onPlaybackQualityChange={(e) => {track("PlaybackQualityChange YouTube Video", {name: "YouTube Video", action: "PlaybackQualityChange", challengeId: this.props.challengeId, content: Object.assign({}, this.props, {captions: undefined}), data: e.data})}}
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
                  <button className="btn btn-outline-secondary btn-sm btn-pointer" onClick={this.handleSeek.bind(this, -10)}><FontAwesome name="undo" /> <span>go back 10s</span></button>
                </li>
                <li className="list-inline-item">
                  {/* bug right now, can't move past 1.5 because the increment is always 0.25 */}
                  <button className="btn btn-outline-secondary btn-sm btn-pointer" onClick={this.handlePlaybackChange.bind(this, this.state.playbackRate - 0.25)}><FontAwesome name="backward" /></button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-sm disabled">{this.state.playbackRate}x</button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-outline-secondary btn-sm btn-pointer" onClick={this.handlePlaybackChange.bind(this, this.state.playbackRate + 0.25)}><FontAwesome name="forward" /></button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            {this.state.showHelp && (markdownToHTML(this.props.help) || "Watch the video.")}
          </div>
        </div>
        <div className="col-12 col-md-8 offset-md-2">
          <ul className="list-inline float-md-right">
            <li className="list-inline-item">
              <span className="btn">{secondsToHalfMinutes(this.state.videoDuration - Math.round(this.state.currentTime))} min remaining</span>
            </li>
            {help}
            <li className="list-inline-item">
              <button className="btn btn-link bnt-pointer" onClick={this.props.handleBackButton.bind(this)}><span>back</span></button>
            </li>
            <li className="list-inline-item">
              <button className="btn btn-link bnt-pointer" onClick={this.props.handleSkipClick.bind(this, this.props.challengeId, this.state.showHelp)}>skip</button>
            </li>
            <li className="list-inline-item">
              <button className={"btn btn-outline-secondary btn-lg bnt-pointer" + (this.props.showNextButton ? "" : " disabled")} onClick={this.handleNextClick.bind(this)}>Next</button>
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
  help: PropTypes.string,

  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string,
  submitChallengeResponse: PropTypes.func
}

export default YoutubeVideo
