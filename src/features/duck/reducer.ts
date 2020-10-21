import { Reducer } from 'redux'
import { getType, ActionType } from 'typesafe-actions'

import * as duckActions from './actions'

/**
 * @description Reducers
 * It's a good practice to keep your **state shape** in a comment above the reducers, just to have
 * an overview.
 *
 * In case the state shape is more complex, you should break the reducers into multiple smaller
 * functions that deal with a slice of the state, then combine them at the end.
 *
 * NOTE: Let's keep it simple for now with `switch` statements and abstract later.
 */

export type DucksAction = ActionType<typeof duckActions>

export type DucksState = Readonly<{
  quacking: boolean
  distance: number
  response?: string
}>

const initialState: DucksState = {
  quacking: false,
  distance: 0,
}

export const duckReducer: Reducer<DucksState, DucksAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(duckActions.quack): {
      return { ...state, quacking: !state.quacking }
    }

    case getType(duckActions.swim): {
      const { distance } = action.payload
      return { ...state, distance: state.distance + distance }
    }

    case getType(duckActions.setDucks): {
      return { ...state, ...action.payload }
    }

    default: {
      return state
    }
  }
}

// export const duckReducer = createReducer<DucksState>(initialState, {
//   [getType(actions.quack)]: (state, action) => {
//     state.quacking = !state.quacking
//   },
//   [getType(actions.swim)]: (state, action) => {
//     const { distance } = action.payload
//     state.distance = state.distance + distance
//   },
// })
