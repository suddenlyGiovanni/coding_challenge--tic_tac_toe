import React, { Reducer, useCallback, useReducer } from 'react'
import type { VFC } from 'react'

import styles from './Board.module.css'

import { CellID, CellState, PlayerID } from 'model'
import type { ICellID, ICellState, IPlayerID } from 'model/interfaces'
import { Cell } from 'view/Cell'

const initialState: State = {
  cells: new Map<ICellID, ICellState>([
    [CellID.zero, CellState.Empty],
    [CellID.one, CellState.Empty],
    [CellID.two, CellState.Empty],
    [CellID.three, CellState.Empty],
    [CellID.four, CellState.Empty],
    [CellID.five, CellState.Empty],
    [CellID.six, CellState.Empty],
    [CellID.seven, CellState.Empty],
    [CellID.eight, CellState.Empty],
  ]),
  turn: PlayerID.Player1 as IPlayerID,
}

interface State {
  cells: Map<ICellID, ICellState>
  turn: IPlayerID
}
type Actions =
  | { type: 'changeTurn' }
  | { type: 'setCell'; payload: ICellID }
  | { type: 'reset'; payload: string }

const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case 'changeTurn': {
      return {
        ...state,
        turn:
          state.turn === PlayerID.Player1 ? PlayerID.Player2 : PlayerID.Player1,
      }
    }
    case 'setCell': {
      const cellID = action.payload
      const cellState = state.turn
      state.cells.set(cellID, cellState)
      return state
    }

    case 'reset': {
      return initialState
    }

    default:
      throw new Error('action type not supported')
  }
}

export const Board: VFC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSelect = useCallback(
    (cellId: ICellID): void => {
      console.log(`PlayerID${state.turn} selected cellId: ${cellId}\n`) //TODO: remove this log
      dispatch({ type: 'setCell', payload: cellId })
      dispatch({ type: 'changeTurn' })
    },
    [state.turn]
  )

  return (
    <div
      aria-label="Game Board (three by three grid)"
      className={styles.board}
      id="board"
    >
      {([
        CellID.zero,
        CellID.one,
        CellID.two,
        CellID.three,
        CellID.four,
        CellID.five,
        CellID.six,
        CellID.seven,
        CellID.eight,
      ] as const).map((cellId) => (
        <Cell
          activePlayerID={state.turn}
          cellID={cellId}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          cellState={state.cells.get(cellId)!}
          key={cellId}
          onClick={handleSelect}
        />
      ))}
    </div>
  )
}
