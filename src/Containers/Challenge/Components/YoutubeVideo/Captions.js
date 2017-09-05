import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { define, removePunctuation } from '../../../../modules/strings'
import { addProfileDictionaryWord } from '../../../../modules/redux/profile'
import ProfileDictionaryList from '../../../Shared/ProfileDictionaryList' // probable a better place to add this

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
    const word = removePunctuation(e.target.textContent)
    console.log(word)
    this.props.addProfileDictionaryWord(word)
  }

  handleWordOnMouseEnter(e) {
    const word = removePunctuation(e.target.textContent)
    this.setState({definedWord: word, definitions: []})
    define(word).then((response) => {
      console.log(response)
      this.setState({definitions: response.definitions})
    })
  }

  handleCaptionsOnMouseEnter(e) {
    // pause video
    this.props.handleOnMouseEnter()
  }

  handleCaptionsOnMouseLeave(e) {
    // play video
    this.props.handleOnMouseLeave()
  }

  render() {
    let definitions
    if (this.state.definedWord) {
      definitions = (
        <div className="row">
          <div className="col-12">
            <div className="definition-text">
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
            <div className="captions-text text-center" onMouseEnter={this.handleCaptionsOnMouseEnter.bind(this)} onMouseLeave={this.handleCaptionsOnMouseLeave.bind(this)} >
              {
                this.props.captions && this.props.captions.map((caption, index) => {
                  if (this.props.currentTime > caption.start && this.props.currentTime < caption.end) {
                    const words = caption.text.split(" ").map((word, index) => {
                      return (<span index={index}><a className="btn-pointer" onMouseEnter={this.handleWordOnMouseEnter.bind(this)} onClick={this.handleWordClick.bind(this)}>{word}</a> </span>)
                    })
                    return <p key={index}>{words}</p>
                  }
                })
              }
            </div>
          </div>
        </div>
        {definitions}
        <ProfileDictionaryList />
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


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addProfileDictionaryWord
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Captions)
