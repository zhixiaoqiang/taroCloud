import thunkMiddleware from 'redux-thunk'
import { init } from '@rematch/core'
import immerPlugin from '@rematch/immer'
import updatedPlugin from '@rematch/updated'
import models from '../models'

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}

const store = init({
  models,
  middlewares,
  plugins: [
    immerPlugin(),
    updatedPlugin() // 在一定的时间段内防止昂贵（频繁）的获取请求
  ]
})

export default store

