import { CellID, CellState } from 'model/cell'
import type { IBoard, ICellID, ICellState, IBoardState } from 'model/interfaces'

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

  private cells: Map<CellID, CellState>

  private readonly adjacencyLists: ReadonlyMap<CellID, ReadonlyArray<CellID>>

  private readonly winLookupTable: ReadonlyMap<
    CellID,
    readonly [CellID, CellID, CellID][]
  >

  private constructor() {
    this.cells = Board.makeCells()
    this.adjacencyLists = Board.makeAdjacencyLists()
    this.winLookupTable = Board.makeWinLookupTable()
  }

  public setCellState(cellID: CellID): CellState | undefined {
    throw new Error('Method not implemented.')
  }

  public getCellState(cellID: CellID): CellState {
    throw new Error('Method not implemented.')
  }

  public isCellEmpty(cellID: CellID): boolean {
    throw new Error('Method not implemented.')
  }

  public getBoardState(): IBoardState {
    throw new Error('Method not implemented.')
  }

  public reset(): void {
    this.cells = Board.makeCells()
  }

  public getBoard(): ReadonlyMap<CellID, CellState> {
    return this.cells
  }

  public static getInstance(): Board {
    if (!Board.instance) {
      Board.instance = new Board()
    }
    return Board.instance
  }

  /**
   * @private
   * @static
   * @returns {Map<CellID, CellState>}
   * @memberof Board
   */
  private static makeCells(): Map<ICellID, ICellState> {
    return new Map<ICellID, ICellState>([
      [CellID.zero, CellState.Empty],
      [CellID.one, CellState.Empty],
      [CellID.two, CellState.Empty],
      [CellID.three, CellState.Empty],
      [CellID.four, CellState.Empty],
      [CellID.five, CellState.Empty],
      [CellID.six, CellState.Empty],
      [CellID.seven, CellState.Empty],
      [CellID.eight, CellState.Empty],
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
