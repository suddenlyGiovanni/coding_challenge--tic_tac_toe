import { useState, useEffect } from 'react'

import { Match } from 'model'
import { ICellID, IObserver, IMatchState } from 'model/interfaces'

const match = Match.getInstance()

const initialState: IMatchState = match.getMatchState()

/**
 * View-Model for Match
 */
export function useMatchFacade(): readonly [
  state: IMatchState,
  move: (cellID: ICellID) => void,
  reset: () => void
] {
  const move = (cellID: ICellID): void => match.move(cellID)
  const reset = (): void => match.reset()
  const [state, setState] = useState<IMatchState>(initialState)

  /**
   * Manage subscriptions with auto-cleanup
   */
  useEffect(() => {
    const observer: IObserver<IMatchState> = {
      update: (matchState) => setState(matchState),
    }

    match.registerObserver(observer)

    return (): void => match.removeObserver(observer)
  }, [])

  return [state, move, reset]
}
