import type {
  ITurn,
  IPlayer1,
  IPlayer2,
  ICellID,
  IBoard,
  IPlayerID,
} from 'model/interfaces'

export interface IMatchStatus {}

/**
 * Creates an instance of a Match, two players and keeps track of whose turn it is.
 * The match will be responsible for making a move on the board and making sure that the move is
 * valid.
 * Also, it will be able to identify when someone has won.
 * @export
 * @interface IMatch
 */
export interface IMatch {
  readonly player1: IPlayer1
  readonly player2: IPlayer2
  readonly board: IBoard
  readonly turn: ITurn

  /**
   * reset the state for a new match
   * @memberof IMatch
   */
  reset(): void

  /**
   * handle a player's move
   * @param {Players} player
   * @param {CellsIds} cellID
   * @memberof IMatch
   */
  move(player: IPlayerID, cellID: ICellID): void
}
