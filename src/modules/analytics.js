// wrapper for analytics libraries
export const track = (name, properties) => {
  // mixpanel
  window.mixpanel.track(name, properties)
}
