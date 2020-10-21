import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions'

import * as actions from './actions'

export type ApiAction = ActionType<typeof actions>

export type ApiState = unknown[]

const initialState: ApiState = []

export const apiReducer: Reducer<ApiState, ApiAction> = (
  state = initialState,
  action
) => {
  if (action.type.includes('@api/')) {
    return [...state, action]
  }
  return state
}
