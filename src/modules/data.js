import store from '../store'
import { SET_ANONYMOUS_USER } from './redux/user'

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
  const anonymousUserId = store.getState().user.anonymous_user_id
  if (!jwt && !anonymousUserId) {
    // nothing to authenticate with
    // create an anonymous user on the server
    fetch(`${process.env.REACT_APP_API_URL}/anonymous_users`, {
      method: "post"
    }).then((res) => {
      res.json().then((response) => {
        // store in redux
        store.dispatch({
          type: SET_ANONYMOUS_USER,
          anonymousUserId: response.id
        })
        console.log("created anonymous user", response.id)
        // try again with recursive
        apiRequest(endpoint, options, callback)
      })
    })
  } else {
    // something to authenticate with
    if (jwt) {
      defaultOptions.headers["Authorization"] = `Bearer ${jwt}`
    } else if (anonymousUserId) {
      defaultOptions.headers["AnonymousUser"] = anonymousUserId
    }
    // console.log("jwt", jwt, "anonymousUserId", anonymousUserId)
    // pseudo deep merge
    const mergedHeaders = Object.assign({}, defaultOptions.headers, options.headers)
    const mergedOptions = Object.assign({}, defaultOptions, options, {headers: mergedHeaders})

    // request
    fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, mergedOptions).then((res) => {
      if(res.headers.get("content-type").includes("application/json")) {
        res.json().then((response) => {
          console.log(mergedOptions.method, endpoint, mergedOptions, !!jwt || !!anonymousUserId, res.status, response)
          typeof callback === 'function' && callback(response, res.status)
        })
      } else {
        res.text().then((response) => {
          console.log(mergedOptions.method, endpoint, mergedOptions, !!jwt || !!anonymousUserId, res.status, response)
          typeof callback === 'function' && callback(response, res.status)
        })
      }

    })
  }
}

export const getCurrentUser = (jwt, callback) => {
  apiRequest("/users/me", {}, (response, status) => {
    callback(response)
  })
}
