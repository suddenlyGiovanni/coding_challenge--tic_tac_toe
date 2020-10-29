import React from 'react'
import type { VFC } from 'react'

import { BoardState } from 'model/board'

import { Overlay, Board } from 'view'

export const App: VFC = () => {
  return (
    <>
      <Board />
      <Overlay
        matchState={BoardState.playing}
        // eslint-disable-next-line react/jsx-no-bind
        onRestart={(): void => console.log('restart')}
      />
    </>
  )
}
