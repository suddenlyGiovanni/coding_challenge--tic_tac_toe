/* eslint-disable react/jsx-no-bind */
import React from 'react'
import type { HTMLAttributes, VFC, KeyboardEvent } from 'react'

import styles from './Cell.module.css'

import { CellID, CellState } from 'model'
import type { ICellID, IPlayerID } from 'model/interfaces'
import { cx } from 'utils'

interface CellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  readonly activePlayerID: IPlayerID
  readonly cellID: CellID
  readonly cellState: CellState
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

  const handleOnClick = (): void => {
    if (cellState === CellState.Empty) onClick(cellID)
  }

  const handleKeypress = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (cellState === CellState.Empty && e.key === 'Enter') {
      onClick(cellID)
    }
  }

  const handleArrowNavigation = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'ArrowLeft') {
      console.log(e) // TODO: switch focus to the previous cell
    }
    if (e.key === 'ArrowRight') {
      console.log(e) // TODO: switch focus to the next cell
    }
  }

  const cellClassNames = (): string => {
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
      className={cellClassNames()}
      data-cell
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
