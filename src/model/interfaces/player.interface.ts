export type IPlayerID1 = 1
export type IPlayerID2 = 2

export type IPlayerID = IPlayerID1 | IPlayerID2

/**
 * A player keeps track of the type of player and the name of the player
 * @export
 * @interface IPlayer
 */
export type IPlayer = IPlayer1 | IPlayer2

export interface IPlayer1 {
  readonly id: IPlayerID1
  readonly name: string
}

export interface IPlayer2 {
  readonly id: IPlayerID2
  readonly name: string
}
