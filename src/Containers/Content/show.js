import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setContent } from '../../modules/content'

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
            <h1>Content {content.id}</h1>
            <p>{content.title}</p>
            <p>{content.est_duration}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>{content.embed_url}</p>
            <iframe width="560" height="315" src={content.embed_url} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    )
  }
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
