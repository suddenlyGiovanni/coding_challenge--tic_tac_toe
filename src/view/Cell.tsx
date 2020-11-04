import React, { useCallback } from 'react'
import type { HTMLAttributes, VFC, KeyboardEvent } from 'react'

import styles from './Cell.module.css'

import { CellState } from 'model'
import type { ICellID, ICellState, IPlayerID } from 'model/interfaces'
import { cx } from 'utils'

interface CellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  readonly activePlayerID: IPlayerID
  readonly cellID: ICellID
  readonly cellState: ICellState
  readonly onClick: (cellID: ICellID) => void
}

export const Cell: VFC<CellProps> = ({
  cellID,
  activePlayerID,
  cellState = CellState.Empty,
  onClick,
  ...props
}) => {
  const HUMAN_READABLE_CELL_NUMBER = cellID + 1

  const handleOnClick = useCallback((): void => {
    if (cellState === CellState.Empty) onClick(cellID)
  }, [cellID, cellState, onClick])

  const handleKeypress = useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      if (cellState === CellState.Empty && e.key === 'Enter') {
        onClick(cellID)
      }
    },
    [cellID, cellState, onClick]
  )

  const handleArrowNavigation = useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      if (e.key === 'ArrowLeft') void 0 // TODO: switch focus to the previous cell
      if (e.key === 'ArrowRight') void 0 // TODO: switch focus to the next cell
    },
    []
  )

  const getClassName = (): string => {
    const cellStateStyle =
      cellState === CellState.PlayerID1
        ? styles.cross
        : cellState === CellState.PlayerID2
        ? styles.circle
        : ''

    const onEmptyCellHover =
      activePlayerID === CellState.PlayerID1
        ? styles.nextCross
        : styles.nextCircle

    return cx(styles.cell, cellStateStyle, onEmptyCellHover)
  }

  return (
    <div
      aria-label={`Cell ${HUMAN_READABLE_CELL_NUMBER}`}
      className={getClassName()}
      data-cell-id={cellID}
      data-cell-state={cellState}
      onClick={handleOnClick}
      onKeyDown={handleArrowNavigation}
      onKeyPress={handleKeypress}
      role="button"
      tabIndex={0}
      {...props}
    />
  )
}
