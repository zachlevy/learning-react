import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Footer from '../Shared/Footer'
import { Link } from 'react-router-dom'
import { gradientBackground } from '../../modules/styles'
import { setCourses } from '../../modules/redux/courses'
import CourseList from '../Courses/list'
import { track } from '../../modules/analytics'
import { apiRequest } from '../../modules/data'

class Home extends Component {
  componentDidMount() {
    apiRequest("/courses?ids=8,14,10,11,12,13", {}, (response) => {
      const courseResponse = response.filter((course) => course) // filter out null courses
      this.setState({courses: courseResponse})
      this.props.setCourses(courseResponse)
    })
  }

  handleCallToActionClick(e) {
    track("Click CTA", {
      name: "CTA",
      action: "Click",
      text: e.target.innerHTML,
      eventLabel: e.target.innerHTML
    })
  }

  render() {
    return (
      <div>
        <div className="container-fluid bg-gradient bg-subtle bg-subtle-diamond" style={gradientBackground("#e52d27", "#b31217")}>
          <div className="row">
            <div className="col-12 text-center">
              <br />
              <br />
              <br />
              <br />
              <h2>Vora PHY 131 Midterm #1 Prep</h2>
              <h4>The smartest way to learn</h4>
              <br />
              <Link className="btn btn-outline-secondary btn-lg" onClick={this.handleCallToActionClick.bind(this)} to={"/collections/phy-131"}>Get Started</Link>
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <br />
              <h3 className="text-center">Featured Mini Courses</h3>
              <h5 className="text-center">Mini Courses are the smartest way to learn</h5>
              <br />
            </div>
          </div>
          <CourseList courses={this.props.featuredCourses} />
          <br />
        </div>
        <br />
        <div className="container-fluid bg-gradient bg-subtle bg-subtle-hex" style={gradientBackground("#AA076B", "#61045F")}>
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2 text-center">
              <br />
              <br />
              <br />
              <br />
              <h2>About Vora</h2>
              <h4><em>Vora is finding the smartest way to learn. We see lots of room for improvment in how humans learn. We&#39;re running thousands of experiments on how people learn to improve the learning process for everyone.</em></h4>
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
        <br />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  featuredCourses: state.courses
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setCourses,
  changePage: (url) => push(url)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
