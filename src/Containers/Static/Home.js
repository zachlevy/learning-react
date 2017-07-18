import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Courses from '../Courses'
import Footer from '../Footer'
import { Link } from 'react-router-dom'
import { gradientBackground } from '../../modules/styles'

const Home = props => (
  <div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center bg-gradient" style={gradientBackground("#34e89e", "#0f3443")}>
          <br />
          <br />
          <br />
          <br />
          <h2>Gain Perspective. Find your passion.</h2>
          <h4>And help science while doing it</h4>
          <br />
          <Link role="button" className="btn btn-outline-secondary btn-lg" to={`/courses`}>Let's do it</Link>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
    <br />
    <Courses />
    <br />
    <div className="container-fluid bg-gradient" style={gradientBackground("#34e89e", "#0f3443")}>
      <div className="row">
        <div className="col-12 col-sm-8 offset-sm-2 text-center">
          <br />
          <br />
          <br />
          <br />
          <p><em>Vora is finding the smartest way to learn. We see lots of room for improvment in how humans learn. We&#39;re running thousands of experiments on how people learn to improve the learning process for everyone.</em></p>
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

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/courses')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)
