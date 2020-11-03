import { expect, describe, it, beforeEach, afterEach } from '@jest/globals'

/* eslint-disable sonarjs/no-duplicate-string */
import { CellID, CellState, Board, BoardState } from 'model'
import { PlayerID } from 'model/player'

describe('Board class', () => {
  let board: Board
  beforeEach(() => {
    board = Board.getInstance()
  })

  afterEach(() => {
    board.reset()
  })

  describe('instantiation', () => {
    it('should create an instance of the Board class', () => {
      expect.hasAssertions()
      expect(board).not.toBeUndefined()
      expect(board).toBeInstanceOf(Board)
    })

    it('should create only an instance of the Board class', () => {
      expect.hasAssertions()
      expect(board).toBe(Board.getInstance())
    })
  })

  describe('getBoard', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(board.getBoard).toBeDefined()
    })

    it('should return a preside board when invocated after instantiation', () => {
      expect.hasAssertions()
      board.getBoard().forEach((cell) => {
        expect(cell.getState()).toBe(CellState.Empty)
      })
    })
  })

  describe('setCellState', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(board.setCellState).toBeDefined()
    })

    it('should set the state of a specific cell', () => {
      expect.hasAssertions()
      board.setCellState(CellID.zero, CellState.PlayerID1)
      expect(board.getCellState(CellID.zero)).not.toBe(CellState.Empty)
      expect(board.getCellState(CellID.zero)).toBe(CellState.PlayerID1)
    })

    it('should throw when trying to set the state of a not `Empty` cell', () => {
      expect.hasAssertions()
      board.setCellState(CellID.zero, CellState.PlayerID2)
      expect(() =>
        board.setCellState(CellID.zero, CellState.PlayerID1)
      ).toThrow()

      expect(board.getCellState(CellID.zero)).not.toBe(CellState.PlayerID1)
    })
  })

  describe('getCellState', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(board.getCellState).toBeDefined()
    })

    it('should return the state of given CellID', () => {
      expect.hasAssertions()
      board['board'].get(CellID.zero)?.setState(CellState.PlayerID1)
      expect(board.getCellState(CellID.zero)).not.toBe(CellState.Empty)
      expect(board.getCellState(CellID.zero)).toBe(CellState.PlayerID1)
    })
  })

  describe('isCellEmpty', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(board.isCellEmpty).toBeDefined()
    })

    it('should return `true` if a given cell is `Empty`', () => {
      expect.hasAssertions()
      expect(board.isCellEmpty(CellID.zero)).toBe(true)
    })

    it('should return `false` if a given cell is not `Empty` [`PayerID1` | `PlayerID2`]', () => {
      expect.hasAssertions()
      board.setCellState(CellID.zero, CellState.PlayerID1)
      board.setCellState(CellID.one, CellState.PlayerID2)
      expect(board.isCellEmpty(CellID.zero)).toBe(false)
      expect(board.isCellEmpty(CellID.one)).toBe(false)
    })
  })
  describe('getBoardState', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(board.getBoardState).toBeDefined()
    })

    it(`should return PlayerID1WinState ${1} in case of victory condition for player1`, () => {
      expect.hasAssertions()
      // arrange
      const board = Board.getInstance()
      // act
      board.setCellState(CellID.four, CellState.PlayerID1) // move 1/9
      board.setCellState(CellID.one, CellState.PlayerID2) // move 2/9
      board.setCellState(CellID.six, CellState.PlayerID1) // move 3/9
      board.setCellState(CellID.two, CellState.PlayerID2) // move 4/9
      board.setCellState(CellID.zero, CellState.PlayerID1) // move 5/9
      board.setCellState(CellID.eight, CellState.PlayerID2) // move 6/9
      board.setCellState(CellID.three, CellState.PlayerID1) // move 7/9
      /**
       * assert:
       *
       * Board structure
       * +---+---+---+
       * | X | O | O |
       * +---+---+---+
       * | X | X |   |
       * +---+---+---+
       * | X |   | O |
       * +---+---+---+
       */
      expect(board.getBoardState()).toBe(BoardState.playerID1Wins)
    })

    it(`should return PlayerID2WinState ${2} in case of victory condition for player2`, () => {
      expect.hasAssertions()
      // arrange
      const board = Board.getInstance()
      // act
      board.setCellState(CellID.four, CellState.PlayerID1) // move 1/9
      board.setCellState(CellID.six, CellState.PlayerID2) // move 2/9
      board.setCellState(CellID.zero, CellState.PlayerID1) // move 3/9
      board.setCellState(CellID.eight, CellState.PlayerID2) // move 4/9
      board.setCellState(CellID.five, CellState.PlayerID1) // move 5/9
      board.setCellState(CellID.seven, CellState.PlayerID2) // move 6/9
      /**
       * assert:
       *
       * Board structure
       * +---+---+---+
       * | X |   |   |
       * +---+---+---+
       * |   | X | X |
       * +---+---+---+
       * | O | O | O |
       * +---+---+---+
       */
      expect(board.getBoardState()).toBe(BoardState.playerID2Wins)
    })

    it(`should return 'PlayingState' ${0} state if no win condition has been met and there are still some cell 'EMPTY'`, () => {
      expect.hasAssertions()
      // arrange
      const board = Board.getInstance()
      // act
      board.setCellState(CellID.zero, CellState.PlayerID1) // move 1/9
      board.setCellState(CellID.one, CellState.PlayerID2) // move 2/9
      board.setCellState(CellID.two, CellState.PlayerID1) // move 3/9
      board.setCellState(CellID.three, CellState.PlayerID2) // move 4/9
      board.setCellState(CellID.four, CellState.PlayerID1) // move 5/9
      board.setCellState(CellID.six, CellState.PlayerID2) // move 6/9
      board.setCellState(CellID.five, CellState.PlayerID1) // move 7/9
      board.setCellState(CellID.eight, CellState.PlayerID2) // move 8/9
      /**
       * assert:
       *
       * Board structure
       * +---+---+---+
       * | X | O | X |
       * +---+---+---+
       * | O | X | X |
       * +---+---+---+
       * | O |   | 0 |
       * +---+---+---+
       */
      expect(board.getBoardState()).toBe(BoardState.playing)
    })

    it(`should return 'DrawState' ${3} if no win condition has been met and all the board is filled`, () => {
      expect.hasAssertions()
      // arrange
      const board = Board.getInstance()
      // act
      board.setCellState(CellID.four, CellState.PlayerID1) // move 1/9
      board.setCellState(CellID.one, CellState.PlayerID2) // move 2/9
      board.setCellState(CellID.six, CellState.PlayerID1) // move 3/9
      board.setCellState(CellID.two, CellState.PlayerID2) // move 4/9
      board.setCellState(CellID.zero, CellState.PlayerID1) // move 5/9
      board.setCellState(CellID.eight, CellState.PlayerID2) // move 6/9
      board.setCellState(CellID.five, CellState.PlayerID1) // move 7/9
      board.setCellState(CellID.three, CellState.PlayerID2) // move 8/9
      board.setCellState(CellID.seven, CellState.PlayerID1) // move 9/9
      /**
       * assert:
       *
       * Board structure
       * +---+---+---+
       * | X | O | O |
       * +---+---+---+
       * | O | X | X |
       * +---+---+---+
       * | X | X | O |
       * +---+---+---+
       */
      expect(board.getBoardState()).toBe(BoardState.draw)
    })
  })

  describe('reset', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(board.reset).toBeDefined()
    })

    it('should clear the board, resetting to its original pristine condition', () => {
      // arrange
      const cells = board.getBoard()
      // unsettle the board
      const CellOne = cells.get(CellID.one)
      const CellTwo = cells.get(CellID.two)

      CellOne?.setState(PlayerID.Player1)
      CellTwo?.setState(PlayerID.Player2)

      expect(board.getCellState(CellID.zero)).toBe(CellState.Empty)
      expect(board.getCellState(CellID.one)).toBe(CellState.PlayerID1)
      expect(board.getCellState(CellID.two)).toBe(CellState.PlayerID2)

      // act
      board.reset()

      // asserts
      expect.hasAssertions()
      board.getBoard().forEach((cell) => {
        expect(cell.getState()).toBe(CellState.Empty)
      })
    })
  })
})
