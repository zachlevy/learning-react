import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { apiRequest } from '../../../modules/data'

class Courses extends Component {
  constructor() {
    super()
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    apiRequest("/courses", {}, (response, status) => {
      if (status === 200) {
        this.setState({courses: response})
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <h4>Courses</h4>
            {this.state.courses.map((course, index) => {
              return (
                <div className="row">{course.title}</div>
              )
            })}
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
