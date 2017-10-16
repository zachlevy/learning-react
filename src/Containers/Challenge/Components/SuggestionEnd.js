import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { apiRequest } from '../../../modules/data'

import CourseThumb from '../../Courses/CourseThumb'

class SuggestionEnd extends Component {
  constructor() {
    super()
    this.state = {
      courses: []
    }
  }
  componentDidMount() {
    apiRequest(`/courses?ids=${this.props.courses.join(",")}`, {}, (response) => {
      this.setState({courses: response})
    })
  }
  handleCourseClick() {
    this.props.changePage(`/courses/${this.props.course.id}`)
  }
  handleFinishClick() {
    this.props.submitChallengeResponse(null, "complete")
    this.props.changePage(`/courses`)
  }
  render() {
    const content = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">{content.title}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <br />
            <h3 className="text-center">Recommended Mini Courses</h3>
            <br />
            {
              this.state.courses.map((course, index) => {
                return <CourseThumb className="col-12 col-sm-6" key={index} course={course} handleCourseClick={this.handleCourseClick.bind(this)}  />
              })
            }
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <button className="btn btn-outline-secondary btn-lg btn-pointer" onClick={this.handleFinishClick.bind(this)}>All Mini Courses</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SuggestionEnd.propTypes = {
  courses: PropTypes.array,

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
)(SuggestionEnd)
