export const defaultCourse = {
  title: "Title Placeholder",
  description: "Course description placeholder",
  tags: ["Tag1", "Tag2"],
  ui: {
    icon: "rocket",
    primaryColor: "#000000",
    secondaryColor: "#333333",
    subtle: "hex"
  },
  est_duration: 60,
  flow: [
    {
      id: 0
    }
  ]
}

// returns the default challenge to give the admin user a ui to create challenges
export const defaultChallenge = (name) => {
  // common in every challenge
  const challengeBase = {
    description: "Challenge description placeholder",
    tags: ["Tag1", "Tag2"]
  }
  // template bodies on the model
  // each of these is associated with a ChallengeType instance on the api where the key in this object corresponds to the ChallengeType.name on the api
  const templates = {
    'matching': {
      question: "What are the capital cities?",
      matchWith: [
        "UK",
        "France",
        "Canada",
        "Australia",
        "USA"
      ],
      options: [
        "London",
        "Paris",
        "Ottawa",
        "Canberra",
        "Washington, D.C."
      ],
      feedback: [
        {
          text: "UKLondon",
          prompt: "Correct!",
          correct: true,
          // dependencies: [
          //
          // ]
        }, {
          text: "FranceParis",
          prompt: "Nice!",
          correct: true
        }, {
          text: "CanadaOttawa",
          prompt: "That's pretty good eh!",
          correct: true
        }, {
          text: "AustraliaCanberra",
          prompt: "Sweet. You up for beers this arvo?",
          correct: true
        }, {
          text: "USAWashington, D.C.",
          prompt: "You Did it!",
          correct: true
        }, {
          text: "CanadaCanberra",
          prompt: "Tricky one mate!",
          correct: false
        }, {
          text: "AustraliaOttawa",
          prompt: "It's not that cold there eh",
          correct: false
        }
      ],
      image_url: ""
    },
    'multiple_multiple_choice': {
      question: "I speak Hebrew ____ French but Ann ____",
      question_details: "The details about the question are here and totally optional",
      options: [
        [
          "and",
          "with",
          "together",
          "but"
        ], [
          "don't",
          "doesn't",
          "speaks",
          "doesn't speaks"
        ]
      ],
      feedback: [
        {
          text: "anddoesn't",
          prompt: "that is correct because...",
          correct: true,
          // dependencies: [
          //
          // ]
        }, {
          text: "anddon't",
          correct: false
        }
      ],
      image_url: ""
    },
    'multiple_choice': {
      question: "I speak Hebrew and French but Ann",
      question_details: "The details about the question are here and totally optional",
      options: [
        "don't",
        "doesn't",
        "speaks",
        "doesn't speaks"
      ],
      correct_answer: "doesn't",
      image_url: ""
    },
    'simple_q_and_a': {
      question: "Question?",
      question_details: "The details about the question are here and totally optional",
      answer: "Answer.", // could also be an array, which any value is correct.
      max_length: 140,
      answer_type: "regex", // leave null for everything else
      // dictionary: [ // leave dictionary out because i'm not sure how to handle this yet for admin ui
      //   {
      //     term: "Triumvirate",
      //     definition: "A political alliance between Caesar, Pompey, and Crassus",
      //     link: "https://en.wikipedia.org/wiki/First_Triumvirate"
      //   }
      // ],
      image_url: ""
    },
    'open_ended_q': {
      question: "Question?",
      question_details: "The details about the question are here and totally optional",
      min_length: 10,
      max_length: 140,
      // dictionary: [ // leave dictionary out because i'm not sure how to handle this yet for admin ui
      //   {
      //     term: "Triumvirate",
      //     definition: "A political alliance between Caesar, Pompey, and Crassus",
      //     link: "https://en.wikipedia.org/wiki/First_Triumvirate"
      //   }
      // ],
      image_url: ""
    },
    'simple_text': {
      text: "some awesome text to read\n\n\nsee?\n\n- a bullet\n- another bullet",
      est_duration: 100,
      image_url: ""
    },
    'youtube_video': {
      youtube_id: "7Qtr_vA3Prw",
      est_duration: 748,
      start_seconds: 1,
      end_seconds: 359,
      playback_rate: 1 // [0.5, 0.75, 1, 1.25, 1.5, 2]
    },
    'wikipedia_notes': {
      embed_url: "/wiki/Battle_of_Stamford_Bridge",
      highlights: [
        {
          title: "Death", // this the title of a section
          children: [0, 1, 2] // this is the paragraph index or otherwise children index
        }
      ],
      instructions: [
        "go to the bottom of the article",
        "take notes on the topic"
      ],
      est_duration: 601,
      max_length: 140
    },
    'suggestion_end': {
      courses: [1, 2] // id of the courses
    },
    'external_suggestion_end' : {
      external_contents: [
        {
          external_url: "localhost:3002/wiki/Cato_the_Younger",
          icon: "wikipedia-w",
          text: "Cato the Younger"
        }, {
          external_url: "https://www.youtube.com/watch?v=kOiyt63_1_U",
          icon: "youtube-play",
          text: "His Year: Cato (62 B.C.E.)"
        }
      ]
    },
    'simple_start': {},
    'simple_signup': {
      callToActionText: "What's your email?",
      buttonText: "Click Here"
    }
  }
  const body = templates[name] || {}
  return Object.assign(challengeBase, {body: body})
}
