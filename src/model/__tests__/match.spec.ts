/* eslint-disable sonarjs/no-duplicate-string */
import { expect, describe, jest, it, afterEach } from '@jest/globals'

import { Match, BoardState, CellID } from 'model'
import { CellState } from 'model/cell'
import type { IMatchState, IObserver } from 'model/interfaces'

describe('Match', () => {
  beforeEach(() => {
    Match.getInstance().reset()
  })

  afterEach(() => {
    Match.getInstance().reset()
  })
  describe('instantiation', () => {
    it('should crete an instance of the Match class', () => {
      expect.hasAssertions()
      const match = Match.getInstance()
      expect(match).not.toBeUndefined()
      expect(match).toBeInstanceOf(Match)
    })

    it('should be a Singleton', () => {
      expect.hasAssertions()
      const match = Match.getInstance()
      expect(match).toBe(Match.getInstance())
    })
  })

  describe('reset', () => {
    it('should exist', () => {
      expect.hasAssertions()
      const match = Match.getInstance()
      expect(match.reset).toBeDefined()
    })

    it('should reset/restart the match by clearing the state', () => {
      expect.hasAssertions()
      // arrange
      const match = Match.getInstance()
      match.turn.setInitialState(match.player1.id, 7)
      expect(match.turn.get()).toBe(match.player1.id)
      expect(match.turn.number).toBe(7)
      // act
      match.reset()
      // assert
      match.board.getBoard().forEach((cell) => {
        // expect the board to have been cleared
        expect(cell.isEmpty()).toBe(true)
      })
      expect(match.turn.number).toBe(1)
      // TODO:  expect the player to be one of the players
    })
  })

  describe('observable', () => {
    describe('registerObserver', () => {
      it('should exist', () => {
        expect.hasAssertions()
        expect(Match.getInstance().registerObserver).toBeDefined()
      })

      it('should add and observer', () => {
        expect.hasAssertions()
        const match = Match.getInstance()
        const mockedUpdate = jest.fn()
        const observer: IObserver<IMatchState> = { update: mockedUpdate }
        match.registerObserver(observer)
        expect(match['observers'].includes(observer)).toBe(true)
      })
    })
    describe('removeObserver', () => {
      it('should exist', () => {
        expect.hasAssertions()
        expect(Match.getInstance().removeObserver).toBeDefined()
      })

      it('should remove an observer', () => {
        expect.hasAssertions()
        const match = Match.getInstance()
        const observer1: IObserver<IMatchState> = { update: jest.fn() }
        const observer2: IObserver<IMatchState> = { update: jest.fn() }
        match['observers'].push(observer1, observer2)
        match.removeObserver(observer1)
        expect(match['observers'].includes(observer1)).toBe(false)
        expect(match['observers'].includes(observer2)).toBe(true)
      })
    })

    describe('notifyObservers', () => {
      it('should exist', () => {
        expect.hasAssertions()
        expect(Match.getInstance().notifyObservers).toBeDefined()
      })

      it('should notify the observers', () => {
        expect.hasAssertions()
        // arrange
        const match = Match.getInstance()
        const updateMock = jest.fn()
        const observer: IObserver<IMatchState> = {
          update: updateMock,
        }
        match['observers'].push(observer)

        // act
        match.notifyObservers()

        // assert
        expect(updateMock).toHaveBeenCalledWith(match.getMatchState())
      })
    })
  })

  describe('move', () => {
    it('should error if the cell is not empty', () => {
      expect.hasAssertions()
      const { board, move } = Match.getInstance()
      expect(board.getCellState(CellID.zero)).toBe(CellState.Empty)
      board.setCellState(CellID.zero, CellState.PlayerID1)
      expect(board.isCellEmpty(CellID.zero)).toBe(false)
      expect(() => move(CellID.zero)).toThrowError()
    })

    it('should correctly modify the state of the board', () => {
      // arrange
      const match = Match.getInstance()
      match.turn.setInitialState(match.player1.id)
      expect(match.board.getCellState(CellID.zero)).toBe(CellState.Empty)
      expect(match.turn.number).toBe(1)

      // act
      match.move(CellID.zero)
      // assert
      expect.hasAssertions()
      expect(match.board.getCellState(CellID.zero)).toBe(match.player1.id)
    })

    it('should correctly update the state of the match `PlayingState` | `PlayerID1WinState` | `PlayerID2WinState` | `DrawState`', () => {
      expect.hasAssertions()
      // arrange
      const match = Match.getInstance()
      match.turn.setInitialState(match.player1.id)

      /**
       * assert:
       * moves: [[1,2], [2,4], [3,8], [4,5], [5,3], [6,6], [7,1], [8,7], [9,0]]
       * winning combo: [0, 1, 2]
       * Board structure
       * +---+---+---+
       * | X | X | X |
       * +---+---+---+
       * | X | O | O |
       * +---+---+---+
       * | O | O | X |
       * +---+---+---+
       */
      match.move(CellID.two)
      expect(match.board.getBoardState()).toBe(BoardState.playing)

      match.move(CellID.four)
      expect(match.board.getBoardState()).toBe(BoardState.playing)

      match.move(CellID.eight)
      expect(match.board.getBoardState()).toBe(BoardState.playing)

      match.move(CellID.five)
      expect(match.board.getBoardState()).toBe(BoardState.playing)

      match.move(CellID.three)
      expect(match.board.getBoardState()).toBe(BoardState.playing)

      match.move(CellID.six)
      expect(match.board.getBoardState()).toBe(BoardState.playing)

      match.move(CellID.one)
      expect(match.board.getBoardState()).toBe(BoardState.playing)

      match.move(CellID.seven)
      expect(match.board.getBoardState()).toBe(BoardState.playing)

      match.move(CellID.zero)

      expect(match.board.getBoardState()).toBe(BoardState.playerID1Wins)
    })

    describe('should correctly switch the turn after the move has been made', () => {
      it('bound: `PLAYING`', () => {
        expect.hasAssertions()
        const match = Match.getInstance()
        match.turn.setInitialState(match.player2.id)
        expect(match.turn.get()).toBe(match.player2.id)
        expect(match.turn.number).toBe(1)

        // act
        match.move(CellID.eight)

        expect(match.turn.number).toBe(2)
        expect(match.turn.get()).toBe(match.player1.id)
      })

      it('bound: last move, `DRAW`', () => {
        // arrange
        const match = Match.getInstance()
        match.turn.setInitialState(match.player1.id)
        // act
        match.move(CellID.zero) // 1. Player1 moves to cellZero
        match.move(CellID.one) // 2. Player2 moves to cellOne
        match.move(CellID.two) // 3. Player1 moves to cellTwo
        match.move(CellID.three) // 4. Player2 moves to cellThree
        match.move(CellID.four) // 5. Player1 moves to cellFour
        match.move(CellID.six) // 6. Player2 moves to cellSix
        match.move(CellID.five) // 7. Player1 moves to cellFive
        match.move(CellID.eight) // 8. Player2 moves to cellEight
        /**
         * assert:
         *
         * Board structure
         * +---+---+---+
         * | X | O | X |
         * +---+---+---+
         * | O | X | X |
         * +---+---+---+
         * | O | X | O |
         * +---+---+---+
         */
        expect(
          () => match.move(CellID.seven) // 9. Player1 moves to cellSeven
        ).not.toThrow()
        expect(match.turn.number).toBe(9)
        expect(match.board.getBoardState()).toBe(BoardState.draw)
      })
    })

    it('should correctly notify the registered observes of the new state', () => {
      expect.hasAssertions()
      const match = Match.getInstance()
      match.turn.setInitialState(match.player2.id)
      const updateSpy = jest.fn()
      const observer: IObserver<IMatchState> = { update: updateSpy }
      match.registerObserver(observer)

      /**
       * assert:
       * moves: [[1, 4], [2, 2], [3, 8], [4, 1], [5, 0]]
       * winning combo: [0, 4, 8]
       * Board structure
       * +---+---+---+
       * | O | X | X |
       * +---+---+---+
       * |   | O |   |
       * +---+---+---+
       * |   |   | O |
       * +---+---+---+
       */
      match.move(CellID.four)
      expect(updateSpy).toHaveBeenLastCalledWith(match.getMatchState())

      match.move(CellID.two)
      expect(updateSpy).toHaveBeenLastCalledWith(match.getMatchState())

      match.move(CellID.three)
      expect(updateSpy).toHaveBeenLastCalledWith(match.getMatchState())

      match.move(CellID.one)
      expect(updateSpy).toHaveBeenLastCalledWith(match.getMatchState())

      match.move(CellID.five)
      expect(updateSpy).toHaveBeenLastCalledWith(match.getMatchState())
    })
  })
})
