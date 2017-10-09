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
      solution: "",
      help: "",
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
          // insert: [
          //   {
          //     id: 1,
          //     type: "simple_q_and_a"
          //   }
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
      solution: "",
      help: "",
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
          // insert: [
          //   {
          //     id: 1,
          //     type: "simple_q_and_a"
          //   }
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
      solution: "",
      help: "",
      options: [
        "don't",
        "doesn't",
        "speaks",
        "doesn't speaks"
      ],
      feedback: [
        {
          text: "doesn't",
          prompt: "that is correct because...",
          correct: true,
          // insert: [
          //   {
          //     id: 1,
          //     type: "simple_q_and_a"
          //   }
          // ]
        }, {
          text: "don't",
          prompt: "you chose poorly",
          correct: false
        }
      ],
      image_url: ""
    },
    'simple_q_and_a': {
      question: "Question?",
      solution: "",
      help: "",
      feedback: [
        {
          text: "Answer.",
          prompt: "that is correct because...",
          correct: true,
          answer_type: "regex",
          // insert: [
          //   {
          //     id: 1,
          //     type: "simple_q_and_a"
          //   }
          // ]
        }
      ],
      image_url: ""
    },
    'profile_simple_q_and_a': {
      update_profile: {
        profile_key: "demographic",
        attribute_name: "age",
      },
      question: "Question?",
      solution: "",
      help: "",
      feedback: [
        {
          text: "Answer.",
          prompt: "that is correct because...",
          correct: true,
          answer_type: "regex",
          // insert: [
          //   {
          //     id: 1,
          //     type: "simple_q_and_a"
          //   }
          // ]
        }
      ],
      image_url: ""
    },
    'open_ended_q': {
      question: "Question?",
      solution: "",
      help: "",
      min_length: 10,
      image_url: ""
    },
    'simple_text': {
      text: "some awesome text to read\n\n\nsee?\n\n- a bullet\n- another bullet",
      help: "",
      est_duration: 100,
      image_url: ""
    },
    'youtube_video': {
      youtube_id: "7Qtr_vA3Prw",
      help: "",
      est_duration: 748,
      start_seconds: 1,
      end_seconds: 359,
      playback_rate: 1 // [0.5, 0.75, 1, 1.25, 1.5, 2]
    },
    'wikipedia_notes': {
      embed_url: "/wiki/Battle_of_Stamford_Bridge",
      help: "",
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
      est_duration: 601
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
      ],
      help: ""
    },
    'simple_start': {},
    'simple_signup': {
      callToActionText: "What's your email?",
      buttonText: "Click Here",
      help: ""
    },
    'user_signup': {
      help: "something helpful",
      messaging: "## Signup for free learning" // markdown
    },
    'buttons_end': {
      messaging: "## Thanks for learning", // markdown
      buttons: [
        {
          text: "Back to collection",
          url: "/collections/phy-131"
        },{
          text: "Next Mini Course",
          url: "/courses/1"
        }
      ],
      socialSharingCallToAction: "Share with your friends", // markdown
      socialSharingMessage: "PHY 131 Midterm 1 Test Prep",
      socialSharingUrl: "http://www.voralearning.com/collections/phy-131"
    },
    'feedback': {
      fields: [
        {
          question: "How was the user experience?",
          answerType: "stars",
          name: "userExperience"
        }, {
          question: "What is your fav color?",
          answerType: "text",
          name: "color"
        }
      ]
    }
  }
  const body = templates[name] || {}
  return Object.assign(challengeBase, {body: body})
}
