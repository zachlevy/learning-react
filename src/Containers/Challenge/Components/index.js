import React from 'react'

// import all components in Components directory
import SimpleQAndA from './SimpleQAndA'
import YoutubeVideo from './YoutubeVideo'
import WikipediaNotes from './WikipediaNotes'

// add components to the components object
export default function getChallengeComponent (name, props) {
  console.log(name, props)
  return {
    "simple_q_and_a": (<SimpleQAndA {...props} />),
    "youtube_video": (<YoutubeVideo {...props} />),
    "wikipedia_notes": (<WikipediaNotes {...props} />)
  }[name]
}
