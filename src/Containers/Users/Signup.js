import { EmailSignUpForm } from 'redux-auth/bootstrap-theme'

import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Signup extends Component {
  render() {
    return (
      <div>
        <h1>Signup</h1>
        <EmailSignUpForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)
