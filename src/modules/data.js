import store from '../store'

// converts rails api errors object to array strings
// options is the same as a fetch
// headers are deep merged
export const apiRequest = (endpoint, options, callback) => {
  const defaultOptions = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    }
  }

  // get auth token
  const jwt = store.getState().user.jwt
  if (jwt) {
    defaultOptions.headers["Authorization"] = `Bearer ${jwt}`
  }
  // pseudo deep merge
  const mergedHeaders = Object.assign({}, defaultOptions.headers, options.headers)
  const mergedOptions = Object.assign({}, defaultOptions, options, {headers: mergedHeaders})

  // request
  fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, mergedOptions).then((res) => {
    if(res.headers.get("content-type").includes("application/json")) {
      res.json().then((response) => {
        console.log(mergedOptions.method, endpoint, res.status, response)
        callback(response, res.status)
      })
    } else {
      res.text().then((response) => {
        console.log(mergedOptions.method, endpoint, res.status, response)
        callback(response, res.status)
      })
    }

  })
}

export const getCurrentUser = (jwt, callback) => {
  apiRequest("/users/me", {}, (response, status) => {
    callback(response)
  })
}
