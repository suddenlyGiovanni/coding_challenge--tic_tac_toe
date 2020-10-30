/* eslint-disable sonarjs/no-duplicate-string */
import { expect, describe, it, beforeAll, afterEach } from '@jest/globals'

import { Cell } from 'model'
import { CellID, CellState } from 'model/cell'
import type { ICellID } from 'model/interfaces'

describe('Cell class', () => {
  let cells: Cell<ICellID>[]
  const cellsID = [
    CellID.zero,
    CellID.one,
    CellID.two,
    CellID.three,
    CellID.four,
    CellID.five,
    CellID.six,
    CellID.seven,
    CellID.eight,
  ] as const

  beforeAll(() => {
    cells = cellsID.map((cellID) => new Cell(cellID))
  })

  afterEach(() => {
    cells.forEach((cell) => cell.clear())
  })

  describe('instantiate', () => {
    it('should create an instance of the Cell class', () => {
      expect.hasAssertions()
      expect(cells[0]).toBeInstanceOf(Cell)
    })

    it('should have been set to a specific id and and `Empty` state', () => {
      expect.hasAssertions()
      expect(cells[0].id).toBe(CellID.zero)
      expect(cells[0]['state']).toBe(CellState.Empty)
    })
  })

  describe('getState', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(cells[0].getState).toBeDefined()
    })

    it('returns the current `ICellState`', () => {
      expect.hasAssertions()

      cells[0]['state'] = CellState.Empty
      cells[1]['state'] = CellState.PlayerID1
      cells[2]['state'] = CellState.PlayerID2
      expect(cells[0].getState()).toBe(CellState.Empty)
      expect(cells[1].getState()).toBe(CellState.PlayerID1)
      expect(cells[2].getState()).toBe(CellState.PlayerID2)
    })
  })

  describe('setState', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(cells[0].setState).toBeDefined()
    })
    it('sets the state of the cell to one of the possible values `ICellState`', () => {
      expect.hasAssertions()

      cells[0].setState(CellState.Empty)
      cells[1].setState(CellState.PlayerID1)
      cells[2].setState(CellState.PlayerID2)

      expect(cells[0].getState()).toBe(CellState.Empty)
      expect(cells[1].getState()).toBe(CellState.PlayerID1)
      expect(cells[2].getState()).toBe(CellState.PlayerID2)
    })

    it('should throw an error when trying to set the state of a non empty cell', () => {
      expect.hasAssertions()

      cells[0].setState(CellState.Empty)
      cells[1].setState(CellState.PlayerID1)
      cells[2].setState(CellState.PlayerID2)

      expect(() => cells[0].setState(CellState.PlayerID1)).not.toThrow()
      expect(() => cells[1].setState(CellState.PlayerID1)).toThrow()
      expect(() => cells[2].setState(CellState.PlayerID2)).toThrow()
    })
  })

  describe('clear', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(cells[0].clear).toBeDefined()
    })
    it("should reset the cell to it's original state `Empty`", () => {
      expect.hasAssertions()
      cells.forEach((cell, cellID) => {
        cell['state'] = CellState.PlayerID1
        expect(cell.id).toBe(cellID)
        expect(cell.getState()).toBe(CellState.PlayerID1)
      })

      cells.forEach((cell, cellID) => {
        cell.clear()
        expect(cell.id).toBe(cellID)
        expect(cell.getState()).toBe(CellState.Empty)
      })
    })
  })

  describe('isPlayer1', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(cells[0].isPlayer1).toBeDefined()
    })

    it('should return `true` if the current state of the cell is `IPlayerID1`', () => {
      expect.hasAssertions()

      cells[0].setState(CellState.Empty)
      cells[1].setState(CellState.PlayerID1)
      cells[2].setState(CellState.PlayerID2)

      expect(cells[0].isPlayer1()).toBe(false)
      expect(cells[1].isPlayer1()).toBe(true)
      expect(cells[2].isPlayer1()).toBe(false)
    })
  })

  describe('isPlayer2', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(cells[0].isPlayer2).toBeDefined()
    })

    it('should return `true` if the current state of the cell is `IPlayerID2`', () => {
      expect.hasAssertions()

      cells[0].setState(CellState.Empty)
      cells[1].setState(CellState.PlayerID1)
      cells[2].setState(CellState.PlayerID2)

      expect(cells[0].isPlayer2()).toBe(false)
      expect(cells[1].isPlayer2()).toBe(false)
      expect(cells[2].isPlayer2()).toBe(true)
    })
  })

  describe('isEmpty', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(cells[0].isEmpty).toBeDefined()
    })

    it('should return `true` if the current state of the cell is `IEmpty`', () => {
      expect.hasAssertions()

      cells[0].setState(CellState.Empty)
      cells[1].setState(CellState.PlayerID1)
      cells[2].setState(CellState.PlayerID2)

      expect(cells[0].isEmpty()).toBe(true)
      expect(cells[1].isEmpty()).toBe(false)
      expect(cells[2].isEmpty()).toBe(false)
    })
  })

  describe('toString', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(cells[0].toString).toBeDefined()
    })
    it("returns a string representation of the cell's internal state `PLAYER_1` | `PLAYER_2` | `EMPTY`", () => {
      expect.hasAssertions()

      cells[0].setState(CellState.Empty)
      cells[1].setState(CellState.PlayerID1)
      cells[2].setState(CellState.PlayerID2)

      expect(cells[0].toString()).toBe('EMPTY')
      expect(cells[1].toString()).toBe('PLAYER_1')
      expect(cells[2].toString()).toBe('PLAYER_2')
    })
  })
})
