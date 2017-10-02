import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { markdownToHTML } from '../../../modules/strings'
import SocialSharing from '../../Shared/SocialSharing'

class ButtonsEnd extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <br />
              {markdownToHTML(this.props.messaging)}
            </div>
            <br />
            <div className="text-center">
              <ul className="list-inline">
                {
                  this.props.buttons.map((button, index) => {
                    return <li key={index} className="list-inline-item"><button className="btn btn-outline-secondary btn-lg btn-pointer" onClick={this.props.changePage.bind(this, button.url)}>{button.text}</button></li>
                  })
                }
              </ul>
              <SocialSharing callToAction={this.props.socialSharingCallToAction} message={this.props.socialSharingMessage} socialSharingUrl={this.props.socialSharingUrl} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ButtonsEnd.propTypes = {
  messaging: PropTypes.string,
  buttons: PropTypes.array,
  socialSharingUrl: PropTypes.string,
  socialSharingMessage: PropTypes.string,
  socialSharingCallToAction: PropTypes.string,

  handleBackButton: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number,
  challengeDescription: PropTypes.string,
  submitChallengeResponse: PropTypes.func
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),
}, dispatch)


export default connect(
  null,
  mapDispatchToProps
)(ButtonsEnd)
