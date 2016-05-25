'use strict'

import React, { AsyncStorage } from 'react-native'
import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './js/reducers'
import MoneyApp from './js/MoneyApp'

const logger = createLogger()
const store = createStore(rootReducer, {}, compose(
  autoRehydrate(),
  applyMiddleware(thunk, logger)
))
persistStore(store, {
  storage: AsyncStorage
}).purge(['feed'])

const wrapper = () => {
    return (
        <Provider store={store}>
          <MoneyApp />
        </Provider>
    )
}

export default wrapper
