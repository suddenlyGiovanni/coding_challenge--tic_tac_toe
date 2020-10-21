import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionType } from 'typesafe-actions'

import { duckActions, duckSelectors } from 'features/duck'

type DuckState = { quacking: boolean; distance: number }
export function useDuckState(): DuckState {
  const quacking: boolean = useSelector(duckSelectors.checkIfDuckIsQuaking)
  const distance: number = useSelector(duckSelectors.duckDistance)
  return {
    quacking,
    distance,
  }
}

type DuckDispatcher = {
  quack: () => ActionType<typeof duckActions.quack>
  swim: (distance: number) => ActionType<typeof duckActions.swim>
  fetchDucks: () => ActionType<typeof duckActions.fetchDucks>
}
export function useDuckDispatch(): DuckDispatcher {
  const dispatch = useDispatch()
  const quack = useCallback(() => {
    return dispatch(duckActions.quack())
  }, [dispatch])

  const swim = useCallback(
    (distance: number) => {
      return dispatch(duckActions.swim(distance))
    },
    [dispatch]
  )

  const fetchDucks = useCallback(() => {
    return dispatch(duckActions.fetchDucks())
  }, [dispatch])

  return {
    quack,
    swim,
    fetchDucks,
  }
}
