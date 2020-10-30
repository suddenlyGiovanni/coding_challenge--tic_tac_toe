/* eslint-disable sonarjs/no-duplicate-string */
import { expect, it, describe } from '@jest/globals'

import { Player1, Player2, PlayerID } from 'model/player'

describe('Player class', () => {
  describe('instantiation', () => {
    it('should create an instance of the Player', () => {
      expect.hasAssertions()
      const player1 = Player1.getInstance()
      const player2 = Player2.getInstance()
      expect(Player1.getInstance).not.toBeUndefined()
      expect(Player2.getInstance).not.toBeUndefined()
      expect(player1).toBeInstanceOf(Player1)
      expect(player2).toBeInstanceOf(Player2)
    })

    it('should create only an instance of the Board class', () => {
      expect.hasAssertions()
      const player1 = Player1.getInstance()
      const player2 = Player2.getInstance()
      expect(player1).toBe(Player1.getInstance())
      expect(player2).toBe(Player2.getInstance())
    })
  })

  it('should have an `id` property field', () => {
    expect.hasAssertions()
    expect(Player1.getInstance().id).toBe(PlayerID.Player1)
    expect(Player2.getInstance().id).toBe(PlayerID.Player2)
  })

  it('should have an `name` property field', () => {
    expect.hasAssertions()
    expect(Player1.getInstance().name).not.toBeUndefined()
    expect(Player1.getInstance().name).toBe('PLAYER_1')
    expect(Player2.getInstance().name).not.toBeUndefined()
    expect(Player2.getInstance().name).toBe('PLAYER_2')
  })

  it('should allow a name to be provide at instantiation', () => {
    expect.hasAssertions()
    const p1 = Player1.getInstance('JON_DOE')
    const p2 = Player2.getInstance('JANE_DOE')
    expect(p1.name).toBe('JON_DOE')
    expect(p2.name).toBe('JANE_DOE')
  })
})
