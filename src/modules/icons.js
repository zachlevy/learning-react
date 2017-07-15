// converts a machine name
export const getIcon = (machineName) => {
  return {
    youtube_video: "play-circle",
    simple_q_and_a: "question-circle",
    wikipedia_notes: "info-circle",
    // suggestion_end: "circle",
    // simple_start: "circle",
    // simple_signup: "circle"
  }[machineName] || "circle"
}
