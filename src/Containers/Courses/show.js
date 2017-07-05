import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setCourse } from '../../modules/course'
import { Switch, Route, Link } from 'react-router-dom'
import Challenge from '../Challenge/show'

class Course extends Component {
  componentDidMount() {
    console.log("componentDidMount")
    fetch(`http://localhost:3001/courses/${this.props.match.params.courseId}`).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      // this.setState({course: response})
      this.props.setCourse(response)
    })
  }

  handleNextClick() {
    console.log("handleNextClick")
    // find the current index in flow
    console.log("challenge", this.props.challenge)
    console.log("flow", this.props.course)
    // get the next object
    // push into history the next object id with proper url
    // `/courses/${this.props.course.id}/challenges/${challenge.id}`
  }

  handleSkipClick() {
    console.log("handleSkipClick")
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>Course {this.props.course.title}</h4>
            <p>{this.props.course.description}</p>
          </div>
        </div>
        <Switch>
          <Route path="/courses/:courseId/challenges/:challengeId" render={(props) => {return <Challenge {...props} handleSkipClick={this.handleSkipClick.bind(this)} handleNextClick={this.handleNextClick.bind(this)} />}} />
        </Switch>
        <div className="row">
          <div className="col-12">
            <ul>
              {
                this.props.course.flow && this.props.course.flow.map((challenge, index) => {
                  return (
                    <div>
                      <li key={index}>{JSON.stringify(challenge)}</li>
                      <Link to={`/courses/${this.props.course.id}/challenges/${challenge.id}`}>{challenge.type}</Link>
                    </div>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  course: state.course,
  challenge: state.challenge,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setCourse
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)
