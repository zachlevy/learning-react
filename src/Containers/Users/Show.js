import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class User extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <h4>Welcome {this.props.user.email}</h4>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
