import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setChallenge } from '../../modules/challenge'
import { snakeCaseToPascalCase } from '../../modules/strings'
import SimpleQAndA from './SimpleQAndA'

class Challenge extends Component {
  componentDidMount() {
    console.log("componentDidMount")
    // load the challenge details
    fetch(`http://localhost:3001/challenges/${this.props.match.params.challengeId}?include=challenge_type`).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)

      this.props.setChallenge(response)
    })
  }

  // hacky solution for dynamic components
  challengeComponents(name, props) {
    console.log(name, props)
    return {
      "simple_q_and_a": (<SimpleQAndA {...props} />)
    }[name]
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
            { challenge.body && this.challengeComponents(challenge.challenge_type.name, challenge.body) }
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
