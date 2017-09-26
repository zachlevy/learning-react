import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { apiRequest } from '../../../modules/data'

class Attempts extends Component {
  constructor() {
    super()
    this.state = {
      challengeResponses: []
    }
  }

  getChallengeResponses(flow) {
    const challengesString = Object.keys(flow).reduce((previous, key) => {
      return previous += flow[key].id + ","
    }, "").slice(0, -1)
    console.log("challengesString", challengesString)
    apiRequest(`/challenge_responses?challenge_ids=${challengesString}`, {}, (response) => {
      this.setState({challengeResponses: response})
    })
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(this.props.course).length === 0 && Object.keys(nextProps.course).length > 0) {
      this.getChallengeResponses(nextProps.course.flow)
    }
  }

  render() {
    let course
    if (this.props.course) {
      course = (
        <div>
          <h4>Attempt at {this.props.course.title}</h4>
          <p>{this.props.course.description}</p>
        </div>
      )
    }
    return (
      <div className="container-fluid">
        <div className="container">

          <div className="row">
            <div className="col-12">
              {course}
              <pre>{JSON.stringify(this.props.course)}</pre>
              <pre>{JSON.stringify(this.state.challengeResponses)}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  course: state.course
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Attempts)
