import React, { Component } from 'react'
import { push, goBack } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { apiRequest } from '../../modules/data'
import { arrayChunk } from '../../modules/styles'
import CourseThumb from '../Courses/CourseThumb'

// wrapper for a course
// contains common methods to move the course form challenge to chalenge
class Collection extends Component {
  constructor() {
    super()
    this.state = {
      collection: {},
      courses: []
    }
  }

  componentDidMount() {
    apiRequest(`/collections/${this.props.match.params.collectionId}`, {}, (collectionResponse) => {
      this.setState({collection: collectionResponse})

      apiRequest(`/courses?ids=${collectionResponse.flow.join(",")}`, {}, (coursesResponse, status) => {
        if (status === 200) {
          this.setState({courses: coursesResponse})
        } else {
          this.setState({errors: coursesResponse})
        }
      })

    })
  }

  render() {
    return (
      <div id="collection-show">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <br />
              <h1>{this.state.collection.name}</h1>
              <p>{this.state.collection.description}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {
                arrayChunk(this.state.courses, 3).map((row, index) => {
                  return (
                    <div className="row" key={index}>
                      {
                        row.map((course, index) => {
                          return <CourseThumb className="col-12 col-md-6 col-lg-4" key={index} course={course} />
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
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
)(Collection)
