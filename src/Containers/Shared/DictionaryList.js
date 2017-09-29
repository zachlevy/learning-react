import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class DictionaryList extends Component {
  handleWordClick(e) {
    console.log("handleWordClick", e.target.textContent)
  }

  render() {
    const reversedDictionary = [...this.props.dictionary].reverse()
    let dictionary
    if (this.props.dictionary.length === 0) {
      dictionary = <p>No words</p>
    } else {
      dictionary = (
        <ul>
          {
            reversedDictionary.map((word) => {
              return <li key={word} onClick={this.handleWordClick.bind(this)}>{word}</li>
            })
          }
        </ul>
      )
    }
    return (
      <div className="dictionary-list">
        <h4>Dictionary</h4>
        {dictionary}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dictionary: state.dictionary
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DictionaryList)
