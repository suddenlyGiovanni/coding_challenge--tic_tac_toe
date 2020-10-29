import React from 'react'
import type { VFC } from 'react'

import styles from './Overlay.module.css'

import { BoardState } from 'model/board'
import type { IBoardState, IMatchState } from 'model/interfaces'
import { cx } from 'utils'

interface Props {
  matchState: IMatchState
  onRestart: () => void
}

const message = (state: IBoardState): string => {
  switch (state) {
    case BoardState.draw:
      return 'Draw'

    case BoardState.playerID1Wins:
      return "X's Wins!"

    case BoardState.playerID2Wins:
      return "O's Wins!"

    default:
      return ''
  }
}
export const Overlay: VFC<Props> = ({ matchState, onRestart }) => {
  return (
    <div
      className={cx(
        styles.overlay,
        matchState !== BoardState.playing && styles.show
      )}
      id="winningMessage"
    >
      <div data-winning-message-text>{message(matchState)}</div>
      <button id="restartButton" onClick={onRestart} type="button">
        {'Restart'}
      </button>
    </div>
  )
}
