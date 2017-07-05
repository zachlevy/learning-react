import React, { Component } from 'react'

// import all components in Components directory
import SimpleQAndA from './SimpleQAndA'

// add components to the components object
export default function getChallengeComponent (name, props) {
  console.log(name, props)
  return {
    "simple_q_and_a": (<SimpleQAndA {...props} />)
  }[name]
}
