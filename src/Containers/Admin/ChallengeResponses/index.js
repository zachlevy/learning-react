import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'

class Courses extends Component {
  constructor() {
    super()
    this.state = {
      responses: []
    }
  }

  componentDidMount() {
    apiRequest("/challenge_responses?all=true", {}, (response, status) => {
      if (status === 200) {
        this.setState({responses: response})
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <h3>Total count: {this.state.responses.length}</h3>
            <br />
            <h4>Challenge Responses</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Course_id</th>
                  <th>Challenge_id</th>
                  <th>User_id</th>
                  <th>Anonymous_User_id</th>
                  <th>Response</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.responses.map((response, index) => {
                    return (
                      <tr key={index}>
                        <td>{response.id}</td>
                        <td>{response.course_id}</td>
                        <td>{response.challenge_id}</td>
                        <td>{response.user_id}</td>
                        <td>{response.anonymous_user_id}</td>
                        <td>{response.input.text}</td>
                        <td>{response.created_at}</td>
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
