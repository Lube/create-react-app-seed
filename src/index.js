import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import ConnectedRouter from './routing/router'
import createStore from './store'
import App from './layouts/App'
import './index.css'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const store = createStore()
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter layout={App} />
    </Provider>,
    MOUNT_NODE
  )
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routing/routes'], () => render())
}

// ========================================================
// Go!
// ========================================================
render()
