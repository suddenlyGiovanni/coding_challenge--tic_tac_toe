import { StateType, ActionType } from 'typesafe-actions'

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./index').store>

  export type RootState = StateType<typeof import('./root-reducer').rootReducer>

  export type RootAction = ActionType<typeof import('./root-action').rootAction>

  interface Types {
    RootAction: RootAction
  }
}
