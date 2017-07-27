// converts a machine name
export const secondsToMinutes = (seconds) => {
  return Math.round(seconds / 60)
}

export const getYouTubeVideoDuration = (duration, start, end) => {
  duration -= start || 0
  duration -= duration - end || 0
  return duration
}

export const secondsToHalfMinutes = (seconds) => {
  return Math.round(seconds / 30) / 2
}
