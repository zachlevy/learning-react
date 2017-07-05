import React from 'react'

// import all components in Components directory
import SimpleQAndA from './SimpleQAndA'
import YoutubeVideo from './YoutubeVideo'

// add components to the components object
export default function getChallengeComponent (name, props) {
  console.log(name, props)
  return {
    "simple_q_and_a": (<SimpleQAndA {...props} />),
    "youtube_video": (<YoutubeVideo {...props} />)
  }[name]
}
