import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ProfileDictionaryList extends Component {
  handleWordClick(e) {
    console.log("handleWordClick", e.target.textContent)
  }

  render() {
    const reversedProfileDictionary = [...this.props.profile.dictionary].reverse()
    let dictionary
    if (this.props.profile.dictionary.length === 0) {
      dictionary = <p>No words</p>
    } else {
      dictionary = (
        <ul>
          {
            reversedProfileDictionary.map((word) => {
              return <li key={word} onClick={this.handleWordClick.bind(this)}>{word}</li>
            })
          }
        </ul>
      )
    }
    return (
      <div className="profile-dictionary-list">
        <h4>Dictionary</h4>
        {dictionary}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDictionaryList)
