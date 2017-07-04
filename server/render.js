import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { NOT_FOUND } from 'redux-first-router'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'

import App from '../client/App'
import configureStore from './configureStore'
import I18nProvider, { AVAILABLE_LANGUAGES } from '../client/I18nProvider'

export default ({ clientStats, outputPath }) => async (req, res, next) => {
  const store = await configureStore(req.path)
  let status = 200

  // the idiomatic way to handle routes not found :)
  // your component's should also detect this state and render a 404 scene
  if (store.getState().location.type === NOT_FOUND) {
    status = 404
  }

  const app = ReactDOM.renderToString(
    <Provider store={store}>
      <I18nProvider browserLanguage={req.acceptsLanguages(AVAILABLE_LANGUAGES)}>
        <App />
      </I18nProvider>
    </Provider>
  )
  const state = serialize(store.getState())
  const chunkNames = flushChunkNames()

  const {
    // react components:
    Js,
    Styles, // external stylesheets
    Css, // raw css

    // strings:
    js,
    styles, // external stylesheets
    css, // raw css

    // arrays of file names (not including publicPath):
    scripts,
    stylesheets,

    publicPath
  } = flushChunks(clientStats, {
    chunkNames,
    before: ['bootstrap'],
    after: ['main'],

    // only needed if serving css rather than an external stylesheet
    // note: during development css still serves as a stylesheet
    outputPath
  })


  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          <script type="text/javascript" charSet="UTF-8">window.__data=${state}</script>
          ${js}
        </body>
      </html>`
  )
}
