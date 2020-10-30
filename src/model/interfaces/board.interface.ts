import type {
  ICell,
  ICellID,
  ICellState,
} from 'model/interfaces/cell.interface'

type PlayingState = 0
type PlayerID1WinState = 1
type PlayerID2WinState = 2
type DrawState = 3

export type IBoardState =
  | PlayingState
  | PlayerID1WinState
  | PlayerID2WinState
  | DrawState

/**
 * A tic-tac-toe game board
 * The board is a state machine that keeps tracks of different game states.
 * The possible states of the board are: (PLAYING, PLAYER1_WINS, PLAYER2_WINS, DRAW )
 * The board is aware of the state of each individual cell (empty or not).
 * The board can tell is a given cell is empty.
 * The board is also able to check if someone has won or tied the match.
 * @export
 * @interface IBoard
 */
export interface IBoard {
  /**
   * reset the board to its initial state
   * @memberof IBoard
   */
  reset(): void

  /**
   * sets a new cell state for a given cell.
   * if the cell is empty then it and returns the new state signaling a successful operation,
   * otherwise it returns undefined
   * @param {CellsIds} cellID
   * @returns {(undefined | CellStatus)}
   * @memberof IBoard
   */
  setCellState(cellID: ICellID, cellState: ICellState): void

  /**
   * returns the cell state
   * @param {CellsIds} cellID
   * @returns {CellStatus}
   * @memberof IBoard
   */
  getCellState(cellID: ICellID): ICellState

  /**
   * returns true if the cell is empty
   * @param {CellsIds} cellID
   * @returns {boolean}
   * @memberof IBoard
   */
  isCellEmpty(cellID: ICellID): boolean

  /**
   * returns the board state which is encoded in the BoardState enum
   * @returns {IBoardState}
   * @memberof IBoard
   */
  getBoardState(): IBoardState

  /**
   * returns a read version of the internal board state
   * @returns {ReadonlyMap<ICellID, ICell<ICellID>>}
   * @memberof IBoard
   */
  getBoard(): ReadonlyMap<ICellID, ICell<ICellID>>
}
