/* eslint-disable sonarjs/no-duplicate-string */
import { expect, describe, jest, it, afterEach } from '@jest/globals'

import { Match, BoardState, CellID } from 'model'
import { Cell, CellState } from 'model/cell'
import type { ICellID, IMatchState, IObserver } from 'model/interfaces'

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

      it.skip('should notify the observers', () => {
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
        expect(updateMock).toHaveBeenCalledWith(BoardState.playing)
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

    it.todo(
      'should correctly update the state of the match `PlayingState` | `PlayerID1WinState` | `PlayerID2WinState` | `DrawState`'
    )

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
        match.move(CellID.zero) // 1. Player1 moves to cellZero
        match.move(CellID.one) // 2. Player2 moves to cellOne
        match.move(CellID.two) // 3. Player1 moves to cellTwo
        match.move(CellID.three) // 4. Player2 moves to cellThree
        match.move(CellID.four) // 5. Player1 moves to cellFour
        match.move(CellID.six) // 6. Player2 moves to cellSix
        match.move(CellID.five) // 7. Player1 moves to cellFive
        match.move(CellID.eight) // 8. Player2 moves to cellEight
        // assert
        expect(
          () => match.move(CellID.seven) // 9. Player1 moves to cellSeven
        ).not.toThrow()
        // TODO: this should already throw
        ;(match.board.getBoard().get(CellID.zero) as Cell<ICellID>)['state'] =
          CellState.Empty

        expect(() => match.move(CellID.zero)).toThrow()
      })
    })

    it.todo('should correctly notify the registered observes of the new state')
  })
})
