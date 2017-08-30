import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { define, removePunctuation } from '../../../../modules/strings'
import { addProfileDictionaryWord } from '../../../../modules/profile'
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

  handleOnMouseEnter(e) {
    this.props.handleOnMouseEnter()
    const word = removePunctuation(e.target.textContent)
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
            <div className="captions-text text-center">
              {
                this.props.captions && this.props.captions.map((caption, index) => {
                  if (this.props.currentTime > caption.start && this.props.currentTime < caption.end) {
                    const words = caption.text.split(" ").map((word, index) => {
                      return (<span index={index}><a className="btn-pointer" onMouseEnter={this.handleOnMouseEnter.bind(this)} onMouseLeave={this.handleOnMouseLeave.bind(this)} onClick={this.handleWordClick.bind(this)}>{word}</a> </span>)
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
