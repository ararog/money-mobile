import { get, post, put, delete } from './api'

import {
    LOAD_CATEGORIES,
    LOAD_CATEGORIES_SUCCESS,
    LOAD_CATEGORIES_ERROR,
} from '../constants/ActionTypes'

export function loadCategories() {
  return dispatch => {

      dispatch(startFetchingCategories(page))

      return get('/categories').then(data => {
          dispatch(fetchCategoriesSuccess(data))
      }).catch(err => {
          dispatch(fetchCategoriesError(err))
      })
  }
}

function startFetchingCategories() {
    return {
        type: LOAD_CATEGORIES
    }
}

function fetchCategoriesSuccess(data) {
    return {
        type: LOAD_CATEGORIES_SUCCESS,
        payload: {
            items: data
        }
    }
}

function fetchCategoriesError(error) {
    return {
        type: LOAD_CATEGORIES_ERROR,
        payload: {
            error
        }
    }
}
