// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import {createLogger} from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'


import auth from './auth'
import productsReducer from './allProducts'

import { configureStore } from '@reduxjs/toolkit'

const reducer = {
  products: productsReducer,
  auth
}

const store = configureStore({
  reducer
})

export default store;

// const reducer = combineReducers({ auth, productsReducer })
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)

// export default store
// export * from './auth'
