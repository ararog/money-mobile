import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from '../constants/ActionTypes'

const initialState = {
  fetchingData: false,
  error: undefined,
  isLogged: false,
  account: []
}

export function users(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case LOGIN: {
      return {...state, fetchingData: true, isLogged: false}
    }
    case LOGIN_SUCCESS: {
      return {...state, fetchingData: false, isLogged: true, account: payload.account}
    }
    case LOGIN_ERROR: {
      return {...state, fetchingData: false, isLogged: false, error: payload.error}
    }
  }

  return state
}
