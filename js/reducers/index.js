'use strict'

import { combineReducers } from 'redux'
import { autoRehydrated } from './persist'
import { categories } from './categories'
import { expenses } from './expenses'
import { users } from './users'

const rootReducer = combineReducers({
    autoRehydrated,
    categories,
    expenses,
    users
})

export default rootReducer
