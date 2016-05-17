import { get, post, put, delete } from './api'

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from '../constants/ActionTypes'

import md5 from 'md5';

export function login(email, password) {
    return dispatch => {

        dispatch(startLogin(page))

        return post('/auth', {
            email: email,
            password: md5(password)
        }).then(data => {
            dispatch(loginSuccess(data))
        }).catch(err => {
            dispatch(loginError(err))
        })
    }
}

function startLogin() {
  return {
      type: LOGIN
  }
}

function loginSuccess(data) {
  return {
      type: LOGIN_SUCCESS,
      payload: {
          account: data
      }
  }
}

function loginError(error) {
  return {
      type: LOGIN_ERROR,
      payload: {
          error
      }
  }
}
