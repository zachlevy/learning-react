import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'

class Courses extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    apiRequest("/admin/anonymous_users", {}, (response, status) => {
      if (status === 200) {
        this.setState({users: response})
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <br />
            <h3>Total count: {this.state.users.length}</h3>
            <br />
            <h4>Anonymous Users</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>User Since</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.created_at}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses)
