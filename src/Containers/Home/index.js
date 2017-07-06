import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Home = props => (
  <div className="container">
    <div className="row">
      <div className="col-12">
        <h1>Home</h1>
        <p>Welcome home!</p>
        <button className="btn btn-primary" onClick={() => props.changePage()}>Go to about page via redux</button>
      </div>
    </div>
  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/courses')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)
