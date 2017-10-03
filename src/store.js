import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules/redux'
import {persistStore, autoRehydrate} from 'redux-persist'

let exportableStore

export const history = createHistory()
export function getStore() {
  return exportableStore
}

// https://github.com/rt2zz/redux-persist/issues/126
// created this way to load redux persisted store before loading the rest the app
export default function configureStore() {
  const initialState = {}
  const enhancers = [
    autoRehydrate()
  ]
  const middleware = [
    thunk,
    routerMiddleware(history)
  ]

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )

  return new Promise((resolve, reject) => {
    try {
      const store = createStore(
        rootReducer,
        initialState,
        composedEnhancers
      )

      // begin periodically persisting the store
      persistStore(
        store, {
          whitelist: ["user"]
        },
        () => {
          exportableStore = store
          resolve(store)
        }
      )
    } catch (e) {
      reject(e)
    }
  })

}
