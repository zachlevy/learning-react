import React from 'react'

// import all components in Components directory
import SimpleQAndA from './SimpleQAndA'
import YoutubeVideo from './YoutubeVideo'
import WikipediaNotes from './WikipediaNotes'
import SuggestionEnd from './SuggestionEnd'
import SimpleStart from './SimpleStart'
import SimpleSignup from './SimpleSignup'

// add components to the components object
export default function getChallengeComponent (name, props) {
  props.key = props.challengeId // clears the state for next component of the same type
  console.log(name, props)
  return {
    "simple_q_and_a": (<SimpleQAndA {...props} />),
    "youtube_video": (<YoutubeVideo {...props} />),
    "wikipedia_notes": (<WikipediaNotes {...props} />),
    "suggestion_end": (<SuggestionEnd {...props} />),
    "simple_start": (<SimpleStart {...props} />),
    "simple_signup": (<SimpleSignup {...props} />),
  }[name]
}
