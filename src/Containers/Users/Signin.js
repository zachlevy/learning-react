import { EmailSignInForm } from 'redux-auth/bootstrap-theme'

import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Signin extends Component {
  render() {
    return (
      <div>
        <h1>Signin</h1>
        <EmailSignInForm />
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
)(Signin)
