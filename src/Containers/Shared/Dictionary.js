import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap'

class Dictionary extends Component {
  constructor() {
    super()
    this.state = {
      popoverOpen: false
    }
  }
  toggle() {
    console.log("this.state", this.state)
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  render() {
    let link
    if (this.props.link) {
      link = (
        <a href={this.props.link} target="_blank"><br />Read More</a>
      )
    }
    return (
      <div className="dictionary-wrapper">
        <button className="btn-link-inline" id={this.props.index} onClick={this.toggle.bind(this)}>
          {this.props.term}
        </button>
        <Popover placement="top" isOpen={this.state.popoverOpen} target={this.props.index} toggle={this.toggle.bind(this)}>
          <PopoverTitle>{this.props.term}</PopoverTitle>
          <PopoverContent>{this.props.definition}{link}</PopoverContent>
        </Popover>
      </div>
    )
  }
}

Dictionary.propTypes = {
  term: PropTypes.string,
  definition: PropTypes.string,
  link: PropTypes.string,
  index: PropTypes.string
}

export default Dictionary
