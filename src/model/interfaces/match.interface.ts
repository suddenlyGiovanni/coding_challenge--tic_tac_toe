import type {
  ITurn,
  IPlayer1,
  IPlayer2,
  ICellID,
  IBoard,
  IBoardState,
  IPlayerID,
  ITurnNumber,
  ICell,
} from 'model/interfaces'

export interface IMatchState {
  board: ReadonlyMap<ICellID, ICell<ICellID>>
  turn: IPlayerID
  turnNumber: ITurnNumber
  state: IBoardState
}

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
   * handle current turn player's move
   * @param {Players} player
   * @param {CellsIds} cellID
   * @memberof IMatch
   */
  move(cellID: ICellID): void
}
