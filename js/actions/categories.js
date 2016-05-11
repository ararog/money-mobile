import { get, post, put, delete } from './api'

export function loadCategories() {
  return get('/categories');
}
