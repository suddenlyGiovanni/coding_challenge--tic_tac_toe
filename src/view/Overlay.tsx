import React, { useContext } from 'react'
import type { VFC } from 'react'

import styles from './Overlay.module.css'

import { BoardState } from 'model/board'
import type { IBoardState } from 'model/interfaces'
import { cx } from 'utils'
import { MatchCtx } from 'view/App'

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
export const Overlay: VFC = () => {
  const {
    reset,
    board: { getBoardState },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = useContext(MatchCtx)!
  return (
    <div
      className={cx(
        styles.overlay,
        getBoardState() !== BoardState.playing && styles.show
      )}
      id="winningMessage"
    >
      <div data-winning-message-text>{message(getBoardState())}</div>
      <button id="restartButton" onClick={reset} type="button">
        {'Restart'}
      </button>
    </div>
  )
}
