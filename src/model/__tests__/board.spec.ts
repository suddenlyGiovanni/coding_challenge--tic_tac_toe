import { CellID, CellState, Board } from 'model'
import type { ICellID, ICellState } from 'model/interfaces'

describe('Board', () => {
  describe('instantiation', () => {
    it('should create an instance of the Board class', () => {
      expect.hasAssertions()
      const board = Board.getInstance()
      expect(board).not.toBeUndefined()
      expect(board).toBeInstanceOf(Board)
    })

    it('should create only an instance of the Board class', () => {
      expect.hasAssertions()
      const board = Board.getInstance()
      expect(board).toBe(Board.getInstance())
    })
  })

  describe('getBoard', () => {
    it('should exist', () => {
      expect.hasAssertions()
      const board = Board.getInstance()
      expect(board.getBoard).toBeDefined()
    })

    it('should return a preside board when invocated after instantiation', () => {
      expect.hasAssertions()
      const board = Board.getInstance()
      board.getBoard().forEach((cellStatus) => {
        expect(cellStatus).toBe(CellState.Empty)
      })
    })
  })

  describe('reset', () => {
    it('should exist', () => {
      expect.hasAssertions()
      const board = Board.getInstance()
      expect(board.reset).toBeDefined()
    })

    it('should clear the board, resetting to its original pristine condition', () => {
      // arrange
      const board = Board.getInstance()
      const cells = board.getBoard() as Map<ICellID, ICellState>
      // unsettle the board
      cells.set(CellID.one, CellState.PlayerID1)
      cells.set(CellID.two, CellState.PlayerID2)
      expect(board.getBoard().get(CellID.one)).toBe(CellState.PlayerID1)
      expect(board.getBoard().get(CellID.two)).toBe(CellState.PlayerID2)
      expect(board.getBoard().get(CellID.three)).toBe(CellState.Empty)

      // act
      board.reset()

      // asserts
      expect.hasAssertions()
      board.getBoard().forEach((cellStatus) => {
        expect(cellStatus).toBe(CellState.Empty)
      })
    })
  })
})
