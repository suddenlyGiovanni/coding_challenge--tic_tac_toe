import React from 'react'
import type { VFC } from 'react'

import { Match } from 'model'

import { Overlay, Board } from 'view'

const match = Match.getInstance()

type ContextInterface = typeof match
export const MatchCtx = React.createContext<null | ContextInterface>(null)

export const App: VFC = () => {
  return (
    <MatchCtx.Provider value={match}>
      <Board />
      <Overlay />
    </MatchCtx.Provider>
  )
}
