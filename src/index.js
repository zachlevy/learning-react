import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import configureStore, { history } from './store'
import App from './Containers/App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

const target = document.getElementById('root')

class Bootloader extends Component {
  state = {
    store: null
  }

  async componentWillMount () {
    const store = await configureStore()
    this.setState({ store })
  }
  render() {
    if (this.state.store === null) {
      return <p></p>
    }
    return (
      <Provider store={this.state.store}>
        <ConnectedRouter history={history}>
          <div>
            <App />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

render (
  <Bootloader />,
  target
)
registerServiceWorker()
