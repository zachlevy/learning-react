import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Footer = props => (
  <footer className="container">
    <div className="row">
      <div className="col-12">
        <ul className="list-inline">
          <li className="list-inline-item">Copyright Vora Learning &copy; 2017</li>
        </ul>
      </div>
    </div>
  </footer>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url)
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Footer)
