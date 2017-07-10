// wrapper for analytics libraries
export const track = (name, properties) => {
  // mixpanel
  console.log("track", name, properties)
  window.mixpanel.track(name, properties)
  window.ga('send', 'event', {
    eventCategory: properties.name || name, // Typically the object that was interacted with (e.g. 'Video')
    eventAction: properties.action || name, // The type of interaction (e.g. 'play')
    eventLabel: properties.label, // Useful for categorizing events (e.g. 'Fall Campaign')
    eventValue: properties.value // A numeric value associated with the event (e.g. 42)
  });
}
