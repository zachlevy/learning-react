import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserForm from './UserForm'

class New extends Component {

  handleSubmit(userValues) {
    console.log("handleSubmit", userValues)
  }

  render() {
    return (
      <div>
        <UserForm onSubmit={this.handleSubmit}/>
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
)(New)
