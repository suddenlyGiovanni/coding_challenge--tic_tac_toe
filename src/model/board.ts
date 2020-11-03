/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PlayerID } from 'model'
import { CellID, CellState, Cell } from 'model/cell'
import type {
  IBoard,
  ICellID,
  ICellState,
  IBoardState,
  ICell,
  IPlayerID,
} from 'model/interfaces'

export enum BoardState {
  playing = 0,
  playerID1Wins = 1,
  playerID2Wins = 2,
  draw = 3,
}

/**
 * The board can be model as a Graph made of vertices (cell) and edges (sounding reachable cells).
 * In this instance I have decide to represent it two data structures:
 * - a `list` of all the available vertices and
 * - an `adjacency lists` that maps each vertex with its matching edges
 *
 * Board structure
 * +---+---+---+
 * | 0 | 1 | 2 |
 * +---+---+---+
 * | 3 | 4 | 5 |
 * +---+---+---+
 * | 6 | 7 | 8 |
 * +---+---+---+
 */
export class Board implements IBoard {
  private static instance: Board

  private board: ReadonlyMap<ICellID, ICell<ICellID>>

  public static readonly adjacencyLists: ReadonlyMap<
    CellID,
    ReadonlyArray<CellID>
  > = Board.makeAdjacencyLists()

  public static readonly winLookupTable: ReadonlyMap<
    CellID,
    readonly [CellID, CellID, CellID][]
  > = Board.makeWinLookupTable()

  private constructor(
    board: ReadonlyMap<ICellID, ICell<ICellID>> = Board.makeBoard()
  ) {
    this.board = board
  }

  public setCellState(cellID: CellID, cellState: CellState): void {
    this.board.get(cellID)!.setState(cellState)
  }

  public getCellState(cellID: CellID): ICellState {
    return this.board.get(cellID)!.getState()
  }

  public isCellEmpty(cellID: CellID): boolean {
    return this.board.get(cellID)!.isEmpty()
  }

  private checkWin(
    board: ReadonlyMap<ICellID, ICell<ICellID>>,
    playerID: IPlayerID
  ): boolean {
    /**
     * at this stage, we are only interested in a subset of the board:
     * the one matching the provided state: `IPlayerID1` | `IPlayerID2`
     * therefore we can filter out all the rest
     */
    const playerBoard = new Map(
      [...board].filter(([cellID, cell]) => cell.getState() === playerID)
    )

    const cellIDWinningComb = (
      cellID: ICellID
    ): readonly [ICellID, ICellID, ICellID][] =>
      Board.winLookupTable.get(cellID)!

    const isWinningComb = (winningTuple: [CellID, CellID, CellID]): boolean =>
      winningTuple.every((winningCellID: CellID): boolean =>
        playerBoard.has(winningCellID)
      )

    /**
     * source the possible winning combinations form the lookup table.
     * for each of the player's cell on the board, check if at least one of the possible
     * winning combination is satisfied
     */
    const hasWonReducer = (acc: boolean, cellID: ICellID): boolean => {
      const hasWon = cellIDWinningComb(cellID).some(isWinningComb)
      return hasWon ? hasWon : acc
    }

    return [...playerBoard.keys()].reduce(hasWonReducer, false)
  }

  private checkAvailableCell(
    board: ReadonlyMap<ICellID, ICell<ICellID>>
  ): boolean {
    return [...board.values()].some((cell) => cell.isEmpty())
  }

  public getBoardState(): IBoardState {
    if (this.checkWin(this.board, PlayerID.Player1)) {
      return BoardState.playerID1Wins
    }

    if (this.checkWin(this.board, PlayerID.Player2)) {
      return BoardState.playerID2Wins
    }

    if (this.checkAvailableCell(this.board)) {
      return BoardState.playing
    }

    return BoardState.draw
  }

  public reset(): void {
    this.board.forEach((cell) => cell.clear())
  }

  public getBoard(): ReadonlyMap<CellID, ICell<ICellID>> {
    return this.board
  }

  public static getInstance(
    board?: ReadonlyMap<ICellID, ICell<ICellID>>
  ): IBoard {
    if (!Board.instance) {
      Board.instance = new Board(board)
    }
    if (board) {
      Board.instance.board = board
    }
    return Board.instance
  }

  /**
   * @private
   * @static
   * @returns {Map<CellID, CellState>}
   * @memberof Board
   */
  public static makeBoard(): ReadonlyMap<ICellID, ICell<ICellID>> {
    return new Map<ICellID, ICell<ICellID>>([
      [CellID.zero, new Cell(CellID.zero)],
      [CellID.one, new Cell(CellID.one)],
      [CellID.two, new Cell(CellID.two)],
      [CellID.three, new Cell(CellID.three)],
      [CellID.four, new Cell(CellID.four)],
      [CellID.five, new Cell(CellID.five)],
      [CellID.six, new Cell(CellID.six)],
      [CellID.seven, new Cell(CellID.seven)],
      [CellID.eight, new Cell(CellID.eight)],
    ])
  }

  /**
   * Returns the adjacencyLists representing all the valid edges of each vertex.
   * @private
   * @static
   * @returns {Map<CellID, ReadonlyArray<CellID>>}
   * @memberof Board
   */
  private static makeAdjacencyLists(): ReadonlyMap<
    ICellID,
    ReadonlyArray<ICellID>
  > {
    return new Map<ICellID, ReadonlyArray<ICellID>>([
      [CellID.zero, [CellID.one, CellID.four, CellID.three]],

      [
        CellID.one,
        [CellID.zero, CellID.two, CellID.five, CellID.four, CellID.three],
      ],

      [CellID.two, [CellID.one, CellID.five, CellID.four]],

      [
        CellID.three,
        [CellID.zero, CellID.one, CellID.four, CellID.seven, CellID.six],
      ],

      [
        CellID.four,
        [
          CellID.three,
          CellID.zero,
          CellID.one,
          CellID.two,
          CellID.five,
          CellID.eight,
          CellID.seven,
          CellID.six,
        ],
      ],

      [
        CellID.five,
        [CellID.four, CellID.one, CellID.two, CellID.eight, CellID.seven],
      ],

      [CellID.six, [CellID.three, CellID.four, CellID.seven]],

      [
        CellID.seven,
        [CellID.six, CellID.three, CellID.four, CellID.five, CellID.eight],
      ],

      [CellID.eight, [CellID.seven, CellID.four, CellID.five]],
    ])
  }

  private static makeWinLookupTable(): ReadonlyMap<
    ICellID,
    ReadonlyArray<[ICellID, ICellID, ICellID]>
  > {
    return new Map<ICellID, ReadonlyArray<[ICellID, ICellID, ICellID]>>([
      [
        CellID.zero,
        [
          [CellID.zero, CellID.one, CellID.two],
          [CellID.zero, CellID.four, CellID.eight],
          [CellID.zero, CellID.three, CellID.six],
        ],
      ],

      [
        CellID.one,
        [
          [CellID.one, CellID.zero, CellID.two],
          [CellID.one, CellID.four, CellID.seven],
        ],
      ],

      [
        CellID.two,
        [
          [CellID.two, CellID.one, CellID.zero],
          [CellID.two, CellID.five, CellID.eight],
          [CellID.two, CellID.four, CellID.six],
        ],
      ],

      [
        CellID.three,
        [
          [CellID.three, CellID.zero, CellID.six],
          [CellID.three, CellID.four, CellID.five],
        ],
      ],

      [
        CellID.four,
        [
          [CellID.four, CellID.three, CellID.five],
          [CellID.four, CellID.zero, CellID.eight],
          [CellID.four, CellID.one, CellID.seven],
          [CellID.four, CellID.two, CellID.six],
        ],
      ],

      [
        CellID.five,
        [
          [CellID.five, CellID.four, CellID.three],
          [CellID.five, CellID.two, CellID.eight],
        ],
      ],

      [
        CellID.six,
        [
          [CellID.six, CellID.three, CellID.zero],
          [CellID.six, CellID.four, CellID.two],
          [CellID.six, CellID.seven, CellID.eight],
        ],
      ],

      [
        CellID.seven,
        [
          [CellID.seven, CellID.six, CellID.eight],
          [CellID.seven, CellID.four, CellID.one],
        ],
      ],

      [
        CellID.eight,
        [
          [CellID.eight, CellID.seven, CellID.six],
          [CellID.eight, CellID.four, CellID.zero],
          [CellID.eight, CellID.five, CellID.two],
        ],
      ],
    ])
  }
}
