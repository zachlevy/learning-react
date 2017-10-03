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
    apiRequest("/users", {}, (response, status) => {
      if (status === 200) {
        this.setState({users: response})
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <h3>Total count: {this.state.users.length}</h3>
            <br />
            <h4>Users</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Email</th>
                  <th>User Since</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.users.map((user, index) => {
                    if (user.admin){
                      return (
                        <tr>
                          <td>{user.id}</td>
                          <td>{user.email}</td>
                          <td>{user.created_at}</td>
                          <td>Admin</td>
                        </tr>
                      )
                    }
                    else return (
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
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
