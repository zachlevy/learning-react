// converts a machine name
export const getIcon = (machineName) => {
  return {
    youtube_video: "play-circle",
    simple_q_and_a: "question-circle"
  }[machineName] || "circle"
}
