import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Courses from '../Courses'
import Footer from '../Footer'

const Home = props => (
  <div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center bg-gradient">
          <br />
          <br />
          <br />
          <br />
          <h2>Gain Perspective. Find your passion.</h2>
          <h4>And help science while doing it</h4>
          <br />
          <button className="btn btn-primary" onClick={props.changePage}>Let's do it</button>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
    <br />
    <Courses />
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <hr />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-8 offset-sm-2 text-center">
          <br />
          <br />
          <p><em>The mission of Vora Learning is to continuously improve the learning process for individuals. We see lots of room for improvment in how humans learn. We use scientific experiments to improve to make you learn more and retain more.</em></p>
          <br />
          <br />
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <hr />
        </div>
      </div>
    </div>
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
