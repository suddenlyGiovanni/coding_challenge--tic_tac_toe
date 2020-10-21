import { createAction } from 'typesafe-actions'

import duckTypes from './types'

/*
 * ### Actions
 * It's important to be consistent when defining actions, so let's always export functions from
 * this file, we don't care if the action needs any input from the outside to build the payload
 * or not.
 * NOTE: Trying to impose a bit of structure to the actions object, the`type/payload` approach is
 * pretty popular.
 */

export const quack = createAction(duckTypes.QUACK)()

export const swim = createAction(duckTypes.SWIM, (distance: number) => ({
  distance,
}))()

export const fetchDucks = createAction(duckTypes.FETCH_DUCKS)()

interface DuckData {
  data: { response: string }
}

export const setDucks = createAction(
  duckTypes.SET_DUCKS,
  ({ data }: DuckData) => data
)()
