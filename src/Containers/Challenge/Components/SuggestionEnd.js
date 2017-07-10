import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CourseThumb from '../../Courses/CourseThumb'

class SuggestionEnd extends Component {
  constructor() {
    super()
    this.state = {
      courses: []
    }
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/courses?ids=${this.props.courses.join(",")}`, {
      method: 'get'
    }).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)
      this.setState({courses: response})
    })
  }
  handleCourseClick() {
    this.props.changePage(`/courses/${this.props.course.id}`)
  }
  handleFinishClick() {
    this.props.changePage(`/courses`)
  }
  render() {
    const content = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">{content.title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm-2">
            <h1>Suggested Courses</h1>
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
              <button className="btn btn-primary" onClick={this.handleFinishClick.bind(this)}>Finish Course</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SuggestionEnd.propTypes = {

  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  handleShowNextButton: PropTypes.func,
  challengeId: PropTypes.number
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),

}, dispatch)


export default connect(
  null,
  mapDispatchToProps
)(SuggestionEnd)
