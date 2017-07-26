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

  fetch(`${process.env.REACT_APP_API_URL}/events`, {
    method: 'post',
    body: JSON.stringify({
      event: {
        relations: {
          challenge_id: properties.challengeId,
          user_id: 1
        },
        context: Object.assign(properties, {name: name})
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => {
    return res.json()
  }).then((response) => {
    console.log(response)
  })
}
