import {
    LOAD_CATEGORIES,
    LOAD_CATEGORIES_SUCCESS,
    LOAD_CATEGORIES_ERROR,
} from '../constants/ActionTypes'

const initialState = {
  fetchingData: false,
  reloading: false,
  error: undefined,
  items: []
}

export function categories(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case LOAD_CATEGORIES: {
      return {...state, fetchingData: true, reloading: payload.reloading}
    }
    case LOAD_CATEGORIES_SUCCESS: {
      return {...state, fetchingData: false, items: payload.items}
    }
    case LOAD_CATEGORIES_ERROR: {
      return {...state, fetchingData: false, error: payload.error}
    }
  }

  return state
}
