import React from 'react'
import type { VFC } from 'react'

import styles from './Board.module.css'

import type { ICell, ICellID, IPlayerID } from 'model/interfaces'
import { Cell } from 'view/Cell'

interface Props {
  readonly board: ReadonlyMap<ICellID, ICell<ICellID>>
  readonly onMove: (cellId: ICellID) => void
  readonly turn: IPlayerID
}
export const Board: VFC<Props> = ({ board, onMove, turn }) => {
  return (
    <div
      aria-label="Game Board (three by three grid)"
      className={styles.board}
      id="board"
    >
      {[...board.entries()].map(([cellID, cell]) => (
        <Cell
          activePlayerID={turn}
          cellID={cellID}
          cellState={cell.getState()}
          key={cellID}
          onClick={onMove}
        />
      ))}
    </div>
  )
}
