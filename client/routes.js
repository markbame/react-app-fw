const loadArticle = id =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id,
        title: 'foo bar'
      })
    }, 500)
  })

const modalize = route => {
  return { ...route, modalByDefault: true }
}

const topLevelize = route => {
  return { ...route, topLevel: true }
}

const transform = (routes, transformation) => {
  return Object.getOwnPropertyNames(routes).reduce((result, name) => {
    result[name] = transformation(routes[name])
    return result
  }, {})
}

const topLevelRoutes = {
  home: {
    path: '/'
  },
  notifications: {
    path: '/notifications'
  },
  create: {
    path: '/create'
  },
  groups: {
    path: '/groups'
  },
  profile: {
    path: '/profile'
  }
}



const otherRoutes = {}

const modalRoutes = {
  article: {
    path: '/article/:id',
    thunk: async (dispatch, getState) => {
      const { id } = getState().location.payload
      const data = await loadArticle(id)
      dispatch({
        type: 'ARTICLE_LOADED',
        payload: data
      })
    }
  }
}

export default {
  ...transform(topLevelRoutes, topLevelize),
  ...otherRoutes,
  ...transform(modalRoutes, modalize)
}
