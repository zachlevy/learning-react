// converts a machine name
export const getIcon = (machineName) => {
  return {
    youtube_video: "play-circle",
    simple_q_and_a: "question-circle",
    wikipedia_notes: "info-circle",
    suggestion_end: "star",
    external_suggestion_end: "star",
    simple_start: "circle",
    simple_signup: "circle",
    multiple_choice: "windows",
    multiple_multiple_choice: "windows",
    open_ended_q: "question-circle",
    matching: "bars"
  }[machineName] || "circle"
}
