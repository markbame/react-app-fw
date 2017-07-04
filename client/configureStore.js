import { createStore, compose, combineReducers } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { connectRoutes } from 'redux-first-router'

import prepareMiddleware from './prepareMiddleware'
import routes from './routes'
import reducers from './state/reducers'

export default function configureStore(path) {
  console.log('client path',routes)
  const history = createHistory()

  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    history,
    routes
  ) // notice `thunk`

  const store = createStore(
    reducers({ location: reducer }),
    window.__data,
    compose(enhancer, prepareMiddleware(middleware))
  )

  return store
}
