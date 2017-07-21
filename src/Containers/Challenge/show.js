import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setChallenge } from '../../modules/challenge'
import getChallengeComponent from './Components'
import { updateCourseFlowChallenge } from '../../modules/course'

class Challenge extends Component {
  constructor() {
    super()
    this.state = {
      showNextButton: false
    }
  }
  componentDidMount() {
    console.log("componentDidMount")
    // load the challenge data
    this.getChallengeData(this.props.match.params.challengeId)
  }

  // hits the api and updates redux with challenge data
  getChallengeData(challengeId) {
    fetch(`${process.env.REACT_APP_API_URL}/challenges/${challengeId}?include=challenge_type`).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)

      this.props.setChallenge(response)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.challengeId !== nextProps.match.params.challengeId) {
      // reload challenge data
      this.getChallengeData(nextProps.match.params.challengeId)
      this.setState({showNextButton: false})
    }
  }

  handleShowNextButton() {
    this.props.updateCourseFlowChallenge(this.props.challenge.id, "complete")
    this.setState({showNextButton: true})
  }

  render() {
    const challenge = this.props.challenge
    return (
      <div>
        <div className="row">
          <div className="col-12">
            { challenge.body && getChallengeComponent(
              challenge.challenge_type.name,
              Object.assign(
                {},
                challenge.body,
                {
                  handleNextClick: this.props.handleNextClick.bind(this),
                  handleSkipClick: this.props.handleSkipClick.bind(this),
                  showNextButton: this.state.showNextButton,
                  handleShowNextButton: this.handleShowNextButton.bind(this),
                  challengeId: challenge.id,
                  challengeDescription: challenge.description
                })) }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challenge: state.challenge
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setChallenge,
  updateCourseFlowChallenge
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Challenge)
