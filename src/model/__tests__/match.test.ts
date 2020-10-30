import { expect, describe, test } from '@jest/globals'

import { CellID, CellState, Match, PlayerID } from 'model'

describe.skip('should correctly handle a match of tic-tac-toe', () => {
  test('play to a draw', () => {
    expect.hasAssertions()
    const match = Match.getInstance()
    // forcefully set up a consistent
    match.turn.setInitialState(PlayerID.Player1, 1)

    // act:
    // 1. Player1 moves to cellZero
    expect(match.turn.number).toBe(1)
    expect(match.turn.get()).toBe(PlayerID.Player1)
    expect(match.board.getCellState(CellID.zero)).toBe(CellState.Empty)
    match.move(CellID.zero)
    expect(match.board.getCellState(CellID.zero)).toBe(CellState.PlayerID1)
    // TODO: check the board state
    // TODO: verify the observer has been notified of the new state of the board

    // 2. Player2 moves to cellOne
    expect(match.turn.number).toBe(2)
    expect(match.turn.get()).toBe(PlayerID.Player2)
    expect(match.board.getCellState(CellID.one)).toBe(CellState.Empty)
    match.move(CellID.one)
    expect(match.board.getCellState(CellID.one)).toBe(CellState.PlayerID2)
    // TODO: check the board state
    // TODO: verify the observer has been notified of the new state of the board

    // 3. Player1 moves to cellTwo
    expect(match.turn.number).toBe(3)
    expect(match.turn.get()).toBe(PlayerID.Player1)
    expect(match.board.getCellState(CellID.two)).toBe(CellState.Empty)
    match.move(CellID.two)
    expect(match.board.getCellState(CellID.two)).toBe(CellState.PlayerID1)
    // TODO: check the board state
    // TODO: verify the observer has been notified of the new state of the board

    // 4. Player2 moves to cellThree
    expect(match.turn.number).toBe(4)
    expect(match.turn.get()).toBe(PlayerID.Player2)
    expect(match.board.getCellState(CellID.three)).toBe(CellState.Empty)
    match.move(CellID.three)
    expect(match.board.getCellState(CellID.three)).toBe(CellState.PlayerID2)
    // TODO: check the board state
    // TODO: verify the observer has been notified of the new state of the board

    // 5. Player1 moves to cellFour
    expect(match.turn.number).toBe(5)
    expect(match.turn.get()).toBe(PlayerID.Player1)
    expect(match.board.getCellState(CellID.four)).toBe(CellState.Empty)
    match.move(CellID.four)
    expect(match.board.getCellState(CellID.four)).toBe(CellState.PlayerID1)
    // TODO: check the board state
    // TODO: verify the observer has been notified of the new state of the board

    // 6. Player2 moves to cellSix
    expect(match.turn.number).toBe(6)
    expect(match.turn.get()).toBe(PlayerID.Player2)
    expect(match.board.getCellState(CellID.six)).toBe(CellState.Empty)
    match.move(CellID.six)
    expect(match.board.getCellState(CellID.six)).toBe(CellState.PlayerID2)
    // TODO: check the board state
    // TODO: verify the observer has been notified of the new state of the board

    // 7. Player1 moves to cellFive
    expect(match.turn.number).toBe(7)
    expect(match.turn.get()).toBe(PlayerID.Player1)
    expect(match.board.getCellState(CellID.five)).toBe(CellState.Empty)
    match.move(CellID.five)
    expect(match.board.getCellState(CellID.five)).toBe(CellState.PlayerID1)
    // TODO: check the board state
    // TODO: verify the observer has been notified of the new state of the board

    // 8. Player2 moves to cellEight
    expect(match.turn.number).toBe(8)
    expect(match.turn.get()).toBe(PlayerID.Player2)
    expect(match.board.getCellState(CellID.eight)).toBe(CellState.Empty)
    match.move(CellID.eight)
    expect(match.board.getCellState(CellID.eight)).toBe(CellState.PlayerID2)
    // TODO: check the board state
    // TODO: verify the observer has been notified of the new state of the board

    // 9. Player1 moves to cellSeven
    expect(match.turn.number).toBe(9)
    expect(match.turn.get()).toBe(PlayerID.Player1)
    expect(match.board.getCellState(CellID.seven)).toBe(CellState.Empty)
    match.move(CellID.seven)
    expect(match.board.getCellState(CellID.seven)).toBe(CellState.PlayerID1)
    // TODO: check the board state
    // TODO: verify the observer has been notified of the new state of the board

    // TODO:  verify no more move can be made
    // TODO:  the match has ended with a state of `Draw`
  })
})
