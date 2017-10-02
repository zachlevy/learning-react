import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { FacebookButton, TwitterButton, LinkedInButton, RedditButton, EmailButton, TumblrButton } from "react-social"

class SocialSharing extends Component {
  render () {
    let url = this.props.url || "http://www.voralearning.com"
    let facebookAppId = "120116728665571" // vora learning fb app id
    let message = this.props.message || "Vora Learning | The smartest way to lear."

    return (
      <div className="social-sharing text-center">
        <div>
          {this.props.callToAction}
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <FacebookButton title="Share via Facebook" message={message} appId={facebookAppId} url={url} element="a" className="">
              <i className="fa fa-facebook-square"/>
            </FacebookButton>
          </li>
          <li className="list-inline-item">
            <TwitterButton title="Share via Twitter" message={message} url={url} element="a" className="">
              <i className="fa fa-twitter-square"/>
            </TwitterButton>
          </li>
          <li className="list-inline-item">
            <LinkedInButton title="Share via Linkedin" message={message} url={url} element="a" className="">
              <i className="fa fa-linkedin-square"/>
            </LinkedInButton>
          </li>
          <li className="list-inline-item">
            <RedditButton title="Share via Reddit" message={message} url={url} element="a" className="">
              <i className="fa fa-reddit-square"/>
            </RedditButton>
          </li>
          <li className="list-inline-item">
            <EmailButton title="Share via E-Mail" message={message} url={url} element="a" className="">
              <i className="fa fa-at"/>
            </EmailButton>
          </li>
          <li className="list-inline-item">
            <TumblrButton title="Share via Tumblr" message={message} url={url} element="a" className="">
              <i className="fa fa-tumblr"/>
            </TumblrButton>
          </li>
        </ul>
      </div>
    )
  }
}

SocialSharing.propTypes = {
  url: PropTypes.string,
  callToAction: PropTypes.string,
  message: PropTypes.string,
}

const mapStateToProps = state => ({

})

export default connect(
  mapStateToProps,
  null
)(SocialSharing)
