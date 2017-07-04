import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from 'react-hot-loader/lib/AppContainer'

import App from './App'
import configureStore from './configureStore'
import I18nProvider, { DEFAULT_LANGUAGE } from './I18nProvider'

const store = configureStore()

const getBrowserLanguage = () => {
  return (navigator.language ||
    navigator.userLanguage ||
    navigator.browserLanguage ||
    DEFAULT_LANGUAGE)
    .split('-')[0]
}

const target = document.getElementById('root')

const render = async App =>
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <I18nProvider browserLanguage={getBrowserLanguage()}>
          <App />
        </I18nProvider>
      </AppContainer>
    </Provider>,
    target
  )

if (process.env.NODE_ENV === 'development') {
  module.hot.accept('./App.js', () => {
    const App = require('./App').default
    render(App)
  })

  const ReduxDevTools = require('./ReduxDevTools').default
  const devTarget = document.createElement('div')
  target.parentNode.insertBefore(devTarget, target.nextSibling)
  ReactDOM.render(
    <Provider store={store}>
      <ReduxDevTools />
    </Provider>,
    devTarget
  )
}

render(App)
