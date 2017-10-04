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
    apiRequest("/admin/feedbacks", {}, (response, status) => {
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
                  <th>Feedback</th>
                  <th>User_id</th>
                  <th>Challenge Id</th>
                  <th>Feedback Source</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.feedbacks.map((feedback, index) => {
                    //simple signup feedback source
                    if(feedback.source === 'simple_signup' && feedback.body.user_id){
                      return (
                        <tr>
                          <td>{feedback.id}</td>
                          <td>{feedback.body.input.email}</td>
                          <td>{feedback.body.user_id}</td>
                          <td>{feedback.body.challenge_id}</td>
                          <td>{feedback.source}</td>
                          <td>{feedback.created_at}</td>
                        </tr>
                      )
                    } else if(feedback.source === 'simple_signup' && feedback.body.anonymous_user_id){
                      return (
                        <tr>
                          <td>{feedback.id}</td>
                          <td>{feedback.body.input.email}</td>
                          <td>[a]{feedback.body.anonymous_user_id}</td>
                          <td>{feedback.body.challenge_id}</td>
                          <td>{feedback.source}</td>
                          <td>{feedback.created_at}</td>
                        </tr>
                      )
                    } else if(feedback.source === 'feedback_form_modal' && feedback.body.user_id){
                      return (
                        <tr>
                          <td>{feedback.id}</td>
                          <td>{feedback.body.text}</td>
                          <td>{feedback.body.user_id}</td>
                          <td>{feedback.body.challenge_id}</td>
                          <td>{feedback.source}</td>
                          <td>{feedback.created_at}</td>
                        </tr>
                      )
                    } else if(feedback.source === 'feedback_form_modal' && feedback.body.anonymous_user_id) {
                      return (
                        <tr>
                          <td>{feedback.id}</td>
                          <td>{feedback.body.text}</td>
                          <td>[a]{feedback.body.anonymous_user_id}</td>
                          <td>{feedback.body.challenge_id}</td>
                          <td>{feedback.source}</td>
                          <td>{feedback.created_at}</td>
                        </tr>
                      )
                    } else if(feedback.source === 'feedback_form' && feedback.body.user_id) {
                      return (
                        <tr>
                          <td>{feedback.id}</td>
                          <td>{feedback.body.text}</td>
                          <td>{feedback.body.user_id}</td>
                          <td>{feedback.body.challenge_id}</td>
                          <td>{feedback.source}</td>
                          <td>{feedback.created_at}</td>
                        </tr>
                      )
                    } else if(feedback.source === 'feedback_form' && feedback.body.anonymous_user_id) {
                      return (
                        <tr>
                          <td>{feedback.id}</td>
                          <td>{feedback.body.text}</td>
                          <td>[a]{feedback.body.anonymous_user_id}</td>
                          <td>{feedback.body.challenge_id}</td>
                          <td>{feedback.source}</td>
                          <td>{feedback.created_at}</td>
                        </tr>
                      )
                    } else {
                      return(
                        <tr>
                          <td>{feedback.id}</td>
                          <td>{feedback.body.text}</td>
                          <td>[a]{feedback.body.user_id}</td>
                          <td>{feedback.body.challenge_id}</td>
                          <td>{feedback.source}</td>
                          <td>{feedback.created_at}</td>
                        </tr>
                      )
                    }
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
