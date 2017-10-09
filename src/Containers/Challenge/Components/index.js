import React from 'react'

// import all components in Components directory
import SimpleQAndA from './SimpleQAndA'
import OpenEndedQ from './OpenEndedQ'
import YoutubeVideo from './YoutubeVideo'
import WikipediaNotes from './WikipediaNotes'
import SuggestionEnd from './SuggestionEnd'
import SimpleStart from './SimpleStart'
import SimpleSignup from './SimpleSignup'
import ExternalSuggestionEnd from './ExternalSuggestionEnd'
import MultipleChoice from './MultipleChoice'
import MultipleMultipleChoice from './MultipleMultipleChoice'
import SimpleText from './SimpleText'
import Matching from './Matching'
import UserSignup from './UserSignup'
import ButtonsEnd from './ButtonsEnd'
import Feedback from './Feedback'

// add components to the components object
export default function getChallengeComponent (name, props) {
  props.key = props.challengeId // clears the state for next component of the same type
  return {
    "simple_q_and_a": (<SimpleQAndA {...props} />),
    "profile_simple_q_and_a": (<SimpleQAndA {...props} />),
    "open_ended_q": (<OpenEndedQ {...props} />),
    "youtube_video": (<YoutubeVideo {...props} />),
    "wikipedia_notes": (<WikipediaNotes {...props} />),
    "suggestion_end": (<SuggestionEnd {...props} />),
    "simple_start": (<SimpleStart {...props} />),
    "simple_signup": (<SimpleSignup {...props} />),
    "external_suggestion_end": (<ExternalSuggestionEnd {...props} />),
    "multiple_choice": (<MultipleChoice {...props} />),
    "simple_text": (<SimpleText {...props} />),
    "multiple_multiple_choice": (<MultipleMultipleChoice {...props} />),
    "matching": (<Matching {...props} />),
    "user_signup": (<UserSignup {...props} />),
    "buttons_end": (<ButtonsEnd {...props} />),
    "feedback": (<Feedback {...props} />)
  }[name]
}
