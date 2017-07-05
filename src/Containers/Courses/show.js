import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setCourse } from '../../modules/course'
import { Switch, Route, Link } from 'react-router-dom'
import Content from '../Content/show'
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
          <Route path="/courses/:courseId/contents/:contentId" render={(props) => {return <Content {...props} handleSkipClick={() => {}} handleNextClick={() => {}} />}} />
          <Route path="/courses/:courseId/challenges/:challengeId" render={(props) => {return <Challenge {...props} handleSkipClick={() => {}} handleNextClick={() => {}} />}} />
        </Switch>
        <div className="row">
          <div className="col-12">
            <ul>
              {
                this.props.course.flow && this.props.course.flow.map((item, index) => {
                  return (
                    <div>
                      <li key={index}>{JSON.stringify(item)}</li>
                      <Link to={`/courses/${this.props.course.id}/${item.type}s/${item.id}`}>{item.type}</Link>
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
  course: state.course
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setCourse
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)
