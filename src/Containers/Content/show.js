import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setContent } from '../../modules/content'
import { secondsToMinutes } from '../../modules/time'

class Content extends Component {
  componentDidMount() {
    console.log("componentDidMount")
    // load the content details
    fetch(`http://localhost:3001/contents/${this.props.match.params.contentId}`).then((res) => {
      return res.json()
    }).then((response) => {
      console.log(response)

      this.props.setContent(response)
    })
  }

  render() {
    const content = this.props.content
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">{content.title}</h2>
            <p className="text-center">{secondsToMinutes(content.est_duration)} min</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm-2">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src={content.embed_url} frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="float-md-right">
              <br />
              <button className="btn btn-secondary" onClick={this.props.handleSkipClick.bind(this)}>Skip</button>
              &nbsp;
              <button className="btn btn-primary" onClick={this.props.handleNextClick.bind(this)}>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


Content.propTypes = {
  handleNextClick: PropTypes.func,
  handleSkipClick: PropTypes.func
}

const mapStateToProps = state => ({
  content: state.content
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setContent
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
