import type { IPlayerID1, IPlayerID2 } from 'model/interfaces/player.interface'

export type IEmpty = 0

export type ICellState = IEmpty | IPlayerID1 | IPlayerID2

export type ICellID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

/**
 * A Cell is identify by and ID that is an integer number from 0 to 8.
 * A can be in 3 different states: Empty, PlayerID1, or PlayerID2.
 * @export
 * @interface ICell
 */
export interface ICell<ID extends ICellID> {
  readonly id: ID

  /**
   * reset the cell to it's original status `Empty`
   * @memberof ICell
   */
  clear(): void

  /**
   * sets the state of the cell to one of the possible values `ICellState`
   * @param {ICellState} state
   * @memberof ICell
   */
  setState(state: ICellState): void

  /**
   * returns the current `ICellState`
   * @returns {ICellState}
   * @memberof ICell
   */
  getState(): ICellState

  /**
   * checks if the cell is taken by `IPlayerID1`
   * @returns {boolean}
   * @memberof ICell
   */
  isPlayer1(): boolean

  /**
   * checks if the cell is taken by `IPlayerID2`
   * @returns {boolean}
   * @memberof ICell
   */
  isPlayer2(): boolean

  /**
   * checks if the cell is taken by `IEmpty`
   * @returns {boolean}
   * @memberof ICell
   */
  isEmpty(): boolean

  /**
   * returns a string representation of the cell's internal state
   * @returns {('PLAYER_1' | 'PLAYER_2' | 'EMPTY')}
   * @memberof ICell
   */
  toString(): 'PLAYER_1' | 'PLAYER_2' | 'EMPTY'
}
