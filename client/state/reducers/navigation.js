import routes from '../../routes'

const DEFAULT_PLACE = {
  place: 'home',
  params: {},
  href: {
    type: 'home'
  }
}

const createPlace = (action, location) => {
  return {
    place: action.type,
    params: action.payload,
    href: {
      type: location.type,
      payload: location.payload
    }
  }
}

const removeModal = from => {
  const copy = Object.assign({}, from)
  delete copy.__modal
  return copy
}

const deepEquals = (a, b) => {
  return JSON.stringify(removeModal(a)) === JSON.stringify(removeModal(b))
}

const handleMaybeModal = (state, action, location) => {
  if (action.payload && action.payload.__modal) {
    state.push(createPlace(action, location))
  } else {
    state[state.length - 1] = createPlace(action, location)
  }
  return state
}

const navigation = (state = [], action = {}) => {
  if (action && action.meta && action.meta.location) {
    const location = action.meta.location.current
    switch (state.length) {
      case 0:
        const route = routes[action.type]
        if (route && route.modalByDefault) {
          action.payload.__modal = true

        }
        state = handleMaybeModal([DEFAULT_PLACE], action, location)
        
        break
      case 1:
        state = handleMaybeModal(state, action, location)
        break
      default:
        const up = state[state.length - 2].href
        if (
          location.type === up.type &&
          deepEquals(location.payload, up.payload)
        ) {
          state.pop()
          state[state.length - 1] = createPlace(action, location)
        } else {
          state = handleMaybeModal(state, action, location)
        }
    }
  }
  return state
}

export default navigation
