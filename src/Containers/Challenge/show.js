import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setChallenge } from '../../modules/redux/challenge'
import getChallengeComponent from './Components'
import { updateCourseFlowChallenge } from '../../modules/redux/course'

class Challenge extends Component {
  constructor() {
    super()
    this.state = {
      showNextButton: false
    }
  }
  componentDidMount() {
    // load the challenge data
    this.getChallengeData(this.props.match.params.challengeId)
  }

  // hits the api and updates redux with challenge data
  // the body of the challenge data changes based on the challenge type
  getChallengeData(challengeId) {
    fetch(`${process.env.REACT_APP_API_URL}/challenges/${challengeId}?include=challenge_type`).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      this.props.setChallenge(response)
    })
  }

  // check to see if the challenge has changed, update the challenge data without reloading the component
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.challengeId !== nextProps.match.params.challengeId) {
      // reload challenge data
      this.getChallengeData(nextProps.match.params.challengeId)
      this.setState({showNextButton: false})
    }
  }

  // used for storing the showNextButton state in this component instead of each challenge type component
  // called by challenge type component when a challenge is completed
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
                    handleInsertDependencies: this.props.handleInsertDependencies.bind(this),
                    handleBackButton: this.props.handleBackButton.bind(this),
                    handleNextClick: this.props.handleNextClick.bind(this),
                    handleSkipClick: this.props.handleSkipClick.bind(this),
                    showNextButton: this.state.showNextButton,
                    handleShowNextButton: this.handleShowNextButton.bind(this),
                    challengeId: challenge.id,
                    challengeDescription: challenge.description
                  }
                )
              )
            }
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
