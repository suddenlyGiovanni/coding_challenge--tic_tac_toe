import { RootState } from 'typesafe-actions'

import { DucksState } from './reducer'

import {
  duckActions as actions,
  duckReducer as reducer,
  duckTypes as types,
  duckSelectors as selectors,
} from '.'

/**
 * FIXTURES
 */
const getInitialState = (initial?: Partial<DucksState>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return reducer(initial as DucksState, {} as any)
}

const getRootState = (initial?: Partial<DucksState>): RootState => ({
  duck: getInitialState(initial),
})

describe('feature: `duck`', () => {
  describe('actions', () => {
    it('should create an action to make a duck quack', () => {
      const expectedAction = { type: types.QUACK }
      expect(actions.quack()).toEqual(expectedAction)
    })

    it('should create an action to make a duck swim', () => {
      const distance = 100
      const expectedAction = { type: types.SWIM, payload: { distance } }
      expect(actions.swim(distance)).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    describe('initial state', () => {
      it('should match a snapshot', () => {
        const initialState = getInitialState()
        expect(initialState).toMatchSnapshot()
      })
    })

    describe('toggling `quack`', () => {
      const initialState = getInitialState()
      const state1 = reducer(initialState, actions.quack())
      const state2 = reducer(state1, actions.quack())

      test('the initial state of quacking should be `false`', () => {
        expect(initialState.quacking).toBe(false)
      })

      it('should toggle `quacking` from `false` to `true`', () => {
        expect(state1.quacking).toBe(true)
      })

      it('should toggle `quacking` from `true` to `false`', () => {
        expect(state2.quacking).toBe(false)
      })
    })

    describe('swimming', () => {
      it('should `sum` the `initial` distance `to` the `new` swam `distance`', () => {
        const distance = 100
        const initialState = getInitialState()
        const state1 = reducer(initialState, actions.swim(distance))
        const state2 = reducer(state1, actions.swim(distance))
        expect(initialState.distance).toBe(0)
        expect(state1.distance).toBe(distance)
        expect(state2.distance).toBe(distance + distance)
      })
    })
  })

  describe('selectors', () => {
    const initialRootState = getRootState()

    it('checkIfDuckIsInRange', () => {
      const state1 = getInitialState({ distance: 1001 }) //?
      const rootState1 = getRootState(state1)

      expect(selectors.checkIfDuckIsInRange(initialRootState)).toBe(false)
      expect(selectors.checkIfDuckIsInRange(rootState1)).toBe(true)
    })

    it('checkIfDuckIsQuaking', () => {
      expect(selectors.checkIfDuckIsQuaking(initialRootState)).toBe(false)
      const state1 = getInitialState({ quacking: true })
      const rootState1 = getRootState(state1)
      expect(selectors.checkIfDuckIsQuaking(rootState1)).toBe(true)
    })

    it('duckDistance', () => {
      const distance = 100
      expect(selectors.duckDistance(initialRootState)).toBe(0)
      expect(
        selectors.duckDistance(getRootState(getInitialState({ distance })))
      ).toBe(distance)
    })
  })
})
