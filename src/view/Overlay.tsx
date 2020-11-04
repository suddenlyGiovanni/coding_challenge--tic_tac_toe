import React from 'react'
import type { VFC } from 'react'

import styles from './Overlay.module.css'

import { BoardState } from 'model/board'
import type { IBoardState } from 'model/interfaces'

const getMessage = (
  state: IBoardState
): 'Draw' | "X's Wins!" | "O's Wins!" | 'Playing' => {
  switch (state) {
    case BoardState.draw:
      return 'Draw'

    case BoardState.playerID1Wins:
      return "X's Wins!"

    case BoardState.playerID2Wins:
      return "O's Wins!"

    default:
      return 'Playing'
  }
}

interface Props {
  readonly matchState: IBoardState
  readonly reset: () => void
}

export const Overlay: VFC<Props> = ({ reset, matchState }) => {
  const message = getMessage(matchState)

  return matchState === BoardState.playing ? null : (
    <div className={styles.overlay} id="winningMessage">
      <div>{message}</div>
      <button id="restartButton" onClick={reset} type="button">
        {'Restart'}
      </button>
    </div>
  )
}
