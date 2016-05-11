import { get, post, put, delete } from './api'

import {
    LOAD_OVERVIEW,
    LOAD_OVERVIEW_SUCCESS,
    LOAD_OVERVIEW_ERROR,
    LOAD_EXPENSES,
    LOAD_EXPENSES_SUCCESS,
    LOAD_EXPENSES_ERROR,
    DELETE_EXPENSE,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_ERROR
} from '../constants/ActionTypes'

export function fetchExpenses(page) {
    return dispatch => {

        dispatch(startFetchingExpenses(page))

        return get('posts/best').then(data => {
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
            items: data
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
  return get('/expenses/overview');
}

export function loadExpenses(pageNumber) {
  return get('/expenses', { params: {page: pageNumber} } );
}

export function loadExpenseById(id) {
  return get('/expenses/' + id);
}

export function deleteExpense(id) {
  return delete('/expenses/' + id);
}

export function updateExpense(id, expense) {
  return put('/expenses/' + id, expense);
}

export function addExpense(expense) {
  return post('/expenses', expense);
}
