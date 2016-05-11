import {
  FETCH_NOTIFICATIONS_DATA,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_ERROR
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
    case FETCH_NOTIFICATIONS_DATA: {
      return {...state, fetchingData: true, page: payload.page, reloading: payload.reloading}
    }
    case FETCH_NOTIFICATIONS_SUCCESS: {
      return {...state, fetchingData: false, items: payload.items}
    }
    case FETCH_NOTIFICATIONS_ERROR: {
      return {...state, fetchingData: false, error: payload.error}
    }
  }

  return state
}
