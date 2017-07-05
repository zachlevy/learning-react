import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setChallenge } from '../../modules/challenge'
import getChallengeComponent from './Components'

class Challenge extends Component {
  componentDidMount() {
    console.log("componentDidMount")
    // load the challenge data
    this.getChallengeData(this.props.match.params.challengeId)
  }

  // hits the api and updates redux with challenge data
  getChallengeData(challengeId) {
    fetch(`http://localhost:3001/challenges/${challengeId}?include=challenge_type`).then((res) => {
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
    }
  }

  render() {
    const challenge = this.props.challenge
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Challenge {challenge.id}</h1>
            <p>{challenge.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            { challenge.body && getChallengeComponent(
              challenge.challenge_type.name,
              Object.assign(
                {},
                challenge.body,
                {
                  handleNextClick: this.props.handleNextClick.bind(this),
                  handleSkipClick: this.props.handleSkipClick.bind(this)
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
  setChallenge
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Challenge)
