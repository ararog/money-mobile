import { get, post, put, delete } from './api'

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

export function fetchExpenses(page = 0) {
    return dispatch => {

        dispatch(startFetchingExpenses(page))

        return get('/expenses', {
            params: {page: pageNumber}
        }).then(data => {
            dispatch(fetchExpensesSuccess(data))
        }).catch(err => {
            dispatch(fetchExpensesError(err))
        })
    }
}

function startFetchingExpenses(page) {
    return {
        type: LOAD_EXPENSES,
        payload: {
            page
        }
    }
}

function fetchExpensesSuccess(data) {
    return {
        type: LOAD_EXPENSES_SUCCESS,
        payload: {
            items: data.items,
            total: data.total
        }
    }
}

function fetchExpensesError(error) {
    return {
        type: LOAD_EXPENSES_ERROR,
        payload: {
            error
        }
    }
}

export function loadOverview() {
  return dispatch => {

      dispatch(startFetchingOverview())

      return get('/expenses/overview').then(data => {
          dispatch(fetchOverviewSuccess(data))
      }).catch(err => {
          dispatch(fetchOverviewError(err))
      })
  }
}

function startFetchingOverview() {
  return {
      type: LOAD_OVERVIEW
  }
}

function fetchOverviewSuccess(data) {
  return {
      type: LOAD_OVERVIEW_SUCCESS,
      payload: {
          overview: data
      }
  }
}

function fetchOverviewError(error) {
  return {
      type: LOAD_OVERVIEW_ERROR,
      payload: {
          error
      }
  }
}

export function loadExpenseById(id) {
  return dispatch => {

      dispatch(startFetchingExpense(id))

      return get(`/expenses/{id}`).then(data => {
          dispatch(fetchExpenseSuccess(data))
      }).catch(err => {
          dispatch(fetchExpenseError(err))
      })
  }
}

function startFetchingExpense() {
  return {
      type: LOAD_EXPENSE
  }
}

function fetchExpenseSuccess(expense) {
  return {
      type: LOAD_EXPENSE_SUCCESS,
      expense
  }
}

function fetchExpenseError(error) {
  return {
      type: LOAD_EXPENSE_ERROR,
      payload: {
          error
      }
  }
}

export function deleteExpense(id) {
    return dispatch => {

        dispatch(startDeletingExpense(id))

        return delete(`/expenses/{id}`).then(data => {
            dispatch(deleteExpenseSuccess())
        }).catch(err => {
            dispatch(deleteExpenseError(err))
        })
    }
}

function startDeletingExpense() {
    return {
        type: DELETE_EXPENSE
    }
}

function deleteExpenseSuccess() {
    return {
        type: DELETE_EXPENSE_SUCCESS
    }
}

function deleteExpenseError(error) {
    return {
        type: DELETE_EXPENSE_ERROR,
        payload: {
            error
        }
    }
}

export function updateExpense(id, expense) {

  return dispatch => {

      dispatch(startUpdatingExpense())

      return put(`/expenses/{id}`, expense).then(data => {
          dispatch(updateExpenseSuccess())
      }).catch(err => {
          dispatch(updateExpenseError(err))
      })
  }
}

function startUpdatingExpense() {
    return {
        type: UPDATE_EXPENSE
    }
}

function updateExpenseSuccess() {
    return {
        type: UPDATE_EXPENSE_SUCCESS
    }
}

function updateExpenseError(error) {
    return {
        type: UPDATE_EXPENSE_ERROR,
        payload: {
            error
        }
    }
}

export function addExpense(expense) {

  return dispatch => {

      dispatch(startAddingExpense())

      return post('expenses', expense).then(data => {
          dispatch(addExpenseSuccess())
      }).catch(err => {
          dispatch(addExpenseError(err))
      })
  }
}

function startAddingExpense() {
    return {
        type: ADD_EXPENSE
    }
}

function addExpenseSuccess() {
    return {
        type: ADD_EXPENSE_SUCCESS
    }
}

function addExpenseError(error) {
    return {
        type: ADD_EXPENSE_ERROR,
        payload: {
            error
        }
    }
}
