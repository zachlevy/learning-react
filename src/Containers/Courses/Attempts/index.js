import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { apiRequest } from '../../../modules/data'
import AttemptThumb from './AttemptThumb'

class Attempts extends Component {
  constructor() {
    super()
    this.state = {
      challengeResponses: []
    }
  }

  componentDidMount() {
    apiRequest(`/challenge_responses?course_id=${this.props.match.params.courseId}&include=challenge`, {}, (response) => {
      this.setState({challengeResponses: response})
    })
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
              <br />
              {course}
              <hr />
            </div>
          </div>
          {
            this.state.challengeResponses.map((challengeResponse, index) => {
              return <AttemptThumb key={index} {...challengeResponse} />
            })
          }
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
