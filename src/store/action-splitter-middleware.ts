/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware, Dispatch } from 'redux'
import { RootState, RootAction } from 'typesafe-actions'

export const actionSplitter: Middleware<
  {},
  RootState,
  Dispatch<RootAction>
> = () => next => (action: any): any => {
  Array.isArray(action)
    ? action.forEach(_action => next(_action))
    : next(action)
}
