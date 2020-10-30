import type { ICell, ICellID, ICellState } from 'model/interfaces'
import { PlayerID } from 'model/player'

export enum CellState {
  Empty = 0,
  PlayerID1 = 1,
  PlayerID2 = 2,
}

export enum CellID {
  zero = 0,
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
  seven = 7,
  eight = 8,
}

export class Cell<ID extends ICellID> implements ICell<ID> {
  public readonly id: ID

  private state: ICellState

  public constructor(cellID: ID) {
    this.id = cellID
    this.state = CellState.Empty
  }

  public isPlayer1(): boolean {
    return this.state === PlayerID.Player1
  }

  public isPlayer2(): boolean {
    return this.state === PlayerID.Player2
  }

  public isEmpty(): boolean {
    return this.state === CellState.Empty
  }

  public toString(): 'PLAYER_1' | 'PLAYER_2' | 'EMPTY' {
    switch (this.state) {
      case CellState.PlayerID1:
        return 'PLAYER_1'

      case CellState.PlayerID2:
        return 'PLAYER_2'

      default:
        return 'EMPTY'
    }
  }

  public getState(): CellState {
    return this.state
  }

  public setState(state: CellState): void {
    if (this.isEmpty()) {
      this.state = state
    } else {
      throw new Error(
        "Cell state not Empty. Can't set a new state to a non empty cell"
      )
    }
  }

  public clear(): void {
    this.state = CellState.Empty
  }
}
