import { getDefaultMiddleware } from '@reduxjs/toolkit'

import { actionSplitter } from './action-splitter-middleware'
import { RootState } from './root-reducer'

import { apiMiddleware } from 'features/api'
import { duckMiddleware } from 'features/duck'

type Lazy<T> = () => T
export function insertIf<T>(condition: boolean, ...elements: Lazy<T>[]): T[] {
  return condition ? elements.map(el => el()) : []
}
export const rootMiddleware = [
  ...getDefaultMiddleware<RootState>(),
  actionSplitter,
  duckMiddleware,
  apiMiddleware,
  // ...insertIf(process.env.NODE_ENV === 'development', () =>
  //   import('redux-logger')
  //     .then(module => module.default)
  //     .catch(err => {
  //       console.error(err)
  //     })
  // ),
]

if (process.env.NODE_ENV === 'development') {
  rootMiddleware.push(require('redux-logger').default)
}

export type RootMiddleware = typeof rootMiddleware
