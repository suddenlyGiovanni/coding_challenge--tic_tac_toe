import React from 'react'
import type { VFC } from 'react'

import { useMatchFacade } from 'hooks/use-match-hook'
import { Overlay, Board } from 'view'

export const App: VFC = () => {
  const [state, move, reset] = useMatchFacade()

  return (
    <>
      <Board board={state.board} onMove={move} turn={state.turn} />
      <Overlay matchState={state.state} reset={reset} />
    </>
  )
}
