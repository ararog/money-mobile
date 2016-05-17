import {
    LOAD_OVERVIEW,
    LOAD_OVERVIEW_SUCCESS,
    LOAD_OVERVIEW_ERROR,
    LOAD_EXPENSES,
    LOAD_EXPENSES_SUCCESS,
    LOAD_EXPENSES_ERROR,
    ADD_EXPENSE,
    ADD_EXPENSE_SUCCESS,
    ADD_EXPENSE_ERROR,
    LOAD_EXPENSE,
    LOAD_EXPENSE_SUCCESS,
    LOAD_EXPENSE_ERROR,
    UPDATE_EXPENSE,
    UPDATE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_ERROR,
    DELETE_EXPENSE,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_ERROR
} from '../constants/ActionTypes'

const initialState = {
  fetchingData: false,
  reloading: false,
  error: undefined,
  expense: null,
  page: 0,
  total: 0,
  overview: [],
  expenses: []
}

export function expenses(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case LOAD_OVERVIEW: {
      return {...state, fetchingData: true, reloading: payload.reloading}
    }
    case LOAD_OVERVIEW_SUCCESS: {
      return {...state, fetchingData: false, overview: payload.overview}
    }
    case LOAD_OVERVIEW_ERROR: {
      return {...state, fetchingData: false, error: payload.error}
    }
    case LOAD_EXPENSES: {
      return {...state, fetchingData: true, page: payload.page, reloading: payload.reloading}
    }
    case LOAD_EXPENSES_SUCCESS: {
      return {...state, fetchingData: false, items: payload.items, total: payload.total}
    }
    case LOAD_EXPENSES_ERROR: {
      return {...state, fetchingData: false, error: payload.error}
    }
    case ADD_EXPENSE: {
      return {...state, fetchingData: true}
    }
    case ADD_EXPENSE_SUCCESS: {
      return {...state, fetchingData: false}
    }
    case ADD_EXPENSE_ERROR: {
      return {...state, fetchingData: false, error: payload.error}
    }
    case LOAD_EXPENSE: {
      return {...state, fetchingData: true}
    }
    case LOAD_EXPENSE_SUCCESS: {
      return {...state, fetchingData: false, expense: payload.expense}
    }
    case LOAD_EXPENSE_ERROR: {
      return {...state, fetchingData: false, error: payload.error}
    }
    case UPDATE_EXPENSE: {
      return {...state, fetchingData: true}
    }
    case UPDATE_EXPENSE_SUCCESS: {
      return {...state, fetchingData: false}
    }
    case UPDATE_EXPENSE_ERROR: {
      return {...state, fetchingData: false, error: payload.error}
    }
    case DELETE_EXPENSE: {
      return {...state, fetchingData: true}
    }
    case DELETE_EXPENSE_SUCCESS: {
      return {...state, fetchingData: false}
    }
    case DELETE_EXPENSE_ERROR: {
      return {...state, fetchingData: false, error: payload.error}
    }
  }

  return state
}
