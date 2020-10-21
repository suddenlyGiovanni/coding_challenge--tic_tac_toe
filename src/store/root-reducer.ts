import { combineReducers } from '@reduxjs/toolkit'

import { apiReducer } from 'features/api'
import { duckReducer } from 'features/duck'

export const rootReducer = combineReducers({
  duck: duckReducer,
  api: apiReducer,
  // ...
})

export type RootState = ReturnType<typeof rootReducer>
