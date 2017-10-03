import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'

class Courses extends Component {
  constructor() {
    super()
    this.state = {
      feedbacks: []
    }
  }

  componentDidMount() {
    apiRequest("/feedbacks", {}, (response, status) => {
      if (status === 200) {
        this.setState({feedbacks: response})
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <h3>Total count: {this.state.feedbacks.length}</h3>
            <br />
            <h4>Feedbacks</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Edit Flow</th>
                  <th>Edit Course</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.courses.map((feedback, index) => {
                    return (
                      <tr>
                        <td>{feedback.id}</td>
                        <td>{feedback.title}</td>
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
