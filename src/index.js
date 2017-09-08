import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './Containers/App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

import {initReactDevise} from 'react-devise'
const getConfig = initReactDevise({
  apiResourceName: 'api/auth'
})

const target = document.getElementById('root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
registerServiceWorker()
