import { get, post, put, delete } from './api'

import md5 from 'md5';

export function login(email, password) {
  return post('/auth', {
      email: email,
      password: md5(password)
    });
}
