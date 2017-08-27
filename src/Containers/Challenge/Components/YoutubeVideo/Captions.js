import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Captions extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  handleWordClick(e) {
    console.log("handleWordClick", e.target.textContent)
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="captions-text text-center">
            {
              this.props.captions && this.props.captions.map((caption, index) => {
                if (this.props.currentTime > caption.start && this.props.currentTime < caption.end) {
                  const words = caption.text.split(" ").map((word) => {
                    return (<a className="btn-pointer" onClick={this.handleWordClick.bind(this)}>{word} </a>)
                  })
                  return <p key={index}>{words}</p>
                }
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

Captions.propTypes = {
  currentTime: PropTypes.number,
  captions: PropTypes.array,
}

export default Captions
