import { Match } from 'model'

describe('Match', () => {
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
})
