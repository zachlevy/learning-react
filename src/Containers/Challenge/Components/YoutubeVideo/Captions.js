import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { define } from '../../../../modules/strings'

class Captions extends Component {
  constructor() {
    super()
    this.state = {
      definedWord: null,
      definitions: []
    }
  }

  handleWordClick(e) {
    console.log("handleWordClick", e.target.textContent)
    const word = e.target.textContent.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    console.log(word)
  }

  handleOnMouseEnter(e) {
    this.props.handleOnMouseEnter()
    const word = e.target.textContent.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    this.setState({definedWord: word, definitions: []})
    define(word).then((response) => {
      console.log(response)
      this.setState({definitions: response.definitions})
    })
  }

  handleOnMouseLeave(e) {
    this.props.handleOnMouseLeave()
  }

  render() {
    let definitions
    if (this.state.definedWord) {
      definitions = (
        <div className="row">
          <div className="col-12">
            <div className="captions-text">
              <h4>{this.state.definedWord}</h4>
              {
                this.state.definitions.map((definition, index) => {
                  return <li key={index}>{definition}</li>
                })
              }
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="captions-text text-center">
              {
                this.props.captions && this.props.captions.map((caption, index) => {
                  if (this.props.currentTime > caption.start && this.props.currentTime < caption.end) {
                    const words = caption.text.split(" ").map((word) => {
                      return (<span><a className="btn-pointer" onMouseEnter={this.handleOnMouseEnter.bind(this)} onMouseLeave={this.handleOnMouseLeave.bind(this)} onClick={this.handleWordClick.bind(this)}>{word}</a> </span>)
                    })
                    return <p key={index}>{words}</p>
                  }
                })
              }
            </div>
          </div>
        </div>
        {definitions}
      </div>
    )
  }
}

Captions.propTypes = {
  currentTime: PropTypes.number,
  captions: PropTypes.array,
  handleOnMouseEnter: PropTypes.func,
  handleOnMouseLeave: PropTypes.func
}

export default Captions
