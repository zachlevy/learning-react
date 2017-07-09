import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Courses from '../Courses'

const Home = props => (
  <div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center bg-gradient">
          <br />
          <br />
          <br />
          <br />
          <h2>Learn more. Retain more.</h2>
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
  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/courses')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)
