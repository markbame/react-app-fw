import { applyMiddleware, compose } from 'redux'

const prepare = middleware => {
  if (process.env.NODE_ENV === 'development') {
    const tools = require('./ReduxDevTools').default
    return compose(applyMiddleware(middleware), tools.instrument())
  } else {
    return applyMiddleware(middleware)
  }
}

export default prepare
