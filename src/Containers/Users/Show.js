import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class User extends Component {

  componentDidMount() {
    // temporary until user section is built
    this.props.changePage('/')
  }

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
  changePage: (url) => push(url)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
