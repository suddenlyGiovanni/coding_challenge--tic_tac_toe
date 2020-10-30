import { expect, it, describe } from '@jest/globals'

import { Turn, Player1, Player2, PlayerID } from 'model'
import type { IPlayer1, IPlayer2, ITurn } from 'model/interfaces'

describe('Turn', () => {
  const player1: IPlayer1 = Player1.getInstance()
  const player2: IPlayer2 = Player2.getInstance()

  it('should exist', () => {
    expect.hasAssertions()
    expect(Turn).toBeDefined()
  })

  it('should initialize correctly', () => {
    const turn: ITurn = new Turn(player1, player2)
    expect.hasAssertions()
    expect(turn).toBeInstanceOf(Turn)
  })

  it('should initialize with number equal to `1`', () => {
    const turn: ITurn = new Turn(player1, player2)
    expect.hasAssertions()
    expect(turn.number).toBe(1)
    expect(turn.get() === player1.id || turn.get() === player2.id).toBe(true)
  })

  describe('setInitialState', () => {
    it('should exist', () => {
      expect.hasAssertions()
      expect(new Turn(player1, player2).setInitialState).toBeDefined()
    })

    it('allows to set the initial state of the Turn class to enable predictable testing', () => {
      expect.hasAssertions()
      const turn = new Turn(player1, player2)

      turn.setInitialState(PlayerID.Player1, 1)

      expect(turn.get()).toBe(PlayerID.Player1)
      expect(turn.number).toBe(1)

      turn.setInitialState(PlayerID.Player2, 8)
      expect(turn.get()).toBe(PlayerID.Player2)
      expect(turn.number).toBe(8)
    })
  })
  it('should return the Player whose turn is currently active when `get` method is invoked', () => {
    const turn: ITurn = new Turn(player1, player2)
    turn.setInitialState(PlayerID.Player1)
    expect.hasAssertions()
    expect(turn.get()).toBe(player1.id)
    expect(turn.get()).not.toBe(player2.id)
  })

  it('should return the Player whose turn  will be active next when `peek` method is invoked', () => {
    const turn: ITurn = new Turn(player1, player2)
    turn.setInitialState(PlayerID.Player1)
    expect.hasAssertions()
    expect(turn.peek()).toBe(player2.id)
    expect(turn.peek()).not.toBe(player1.id)
  })

  it('should throw an error when `peek` is invoked and the current turn is the last', () => {
    const turn: ITurn = new Turn(player1, player2)
    turn.setInitialState(PlayerID.Player1, 9)
    expect.hasAssertions()
    expect(() => turn.peek()).toThrowError('This is the last turn')
  })

  it('should have a `number` property of type number that indicate the total number of turns so far', () => {
    const turn: ITurn = new Turn(player1, player2)

    expect.hasAssertions()
    expect(turn.number).toBe(1)
    for (let number = 2; number < 9; number++) {
      turn.next()
      expect(turn.number).toBe(number)
    }
  })

  it('should reset to the initial condition when `clear` method is invoked', () => {
    const turn: ITurn = new Turn(player1, player2)
    turn.setInitialState(PlayerID.Player2, 9)

    expect.hasAssertions()
    expect(turn.number).toBe(9)
    expect(turn.get()).toBe(player2.id)

    turn.reset()
    expect(turn.number).toBe(1)
    expect(turn.get() === player1.id || turn.get() === player2.id).toBe(true)
  })

  it('should switch turn when `next` is invoked', () => {
    const turn: ITurn = new Turn(player1, player2)
    turn.setInitialState(PlayerID.Player1, 1)
    expect.hasAssertions()
    for (let i = turn.number; i < 9; i++) {
      turn.next()
      expect(turn.number).toBe(i + 1)
      expect(turn.get()).toBe((i + 1) % 2 === 0 ? player2.id : player1.id)
    }
  })

  it('should throw an error when `next` is invoked and it is the last turn', () => {
    const turn: ITurn = new Turn(player1, player2)
    turn.setInitialState(PlayerID.Player2, 8)
    expect.hasAssertions()
    expect(() => turn.next()).not.toThrow()
    expect(() => turn.next()).toThrow()
  })
})
