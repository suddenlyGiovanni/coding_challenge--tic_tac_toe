import type { IPlayerID } from 'model/interfaces'

export type ITurnNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface ITurn {
  /**
   * the number of the current turn
   * @type {ITurnNumber} 1 indexed number of turns
   * @memberof ITurn
   */
  number: ITurnNumber

  /**
   * returns who is playing the current turn
   * @returns {IPlayerID}
   * @memberof ITurn
   */
  get(): IPlayerID

  /**
   * returns who will be playing the next turn
   * @returns {IPlayerID} who's next turn is
   * @memberof ITurn
   */
  peek(): IPlayerID

  /**
   * switch turn and then returns who's turn is
   * @returns {IPlayerID} who's new turn is
   * @memberof ITurn
   */
  next(): IPlayerID

  /**
   * reset the state to the initial pristine condition
   * @memberof ITurn
   */
  reset(): void
}
