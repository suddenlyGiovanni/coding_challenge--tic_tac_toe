import type {
  IPlayer,
  IPlayer1,
  IPlayer2,
  IPlayerID,
  ITurn,
  ITurnNumber,
} from 'model/interfaces'

export class Turn implements ITurn {
  private turn: IPlayer1 | IPlayer2

  private readonly player1: IPlayer1
  private readonly player2: IPlayer2

  private turnNumber: ITurnNumber

  public constructor(player1: IPlayer1, player2: IPlayer2) {
    this.player1 = player1
    this.player2 = player2
    this.turn = this.getRandomPlayer()
    this.turnNumber = 1
  }

  public get(): IPlayerID {
    return this.turn.id
  }

  public peek(): IPlayerID {
    if (this.turnNumber < 9) {
      return this.turn === this.player1 ? this.player2.id : this.player1.id
    } else {
      throw new Error('This is the last turn')
    }
  }

  public next(): IPlayerID {
    if (this.turnNumber + 1 > 9) {
      throw new Error('This is the last turn')
    } else {
      const nextTurnID = this.peek()
      this.turn = nextTurnID === this.player1.id ? this.player1 : this.player2
      this.turnNumber += 1
      return nextTurnID
    }
  }

  public reset(): void {
    this.turn = this.getRandomPlayer()
    this.turnNumber = 1
  }

  public get number(): ITurnNumber {
    return this.turnNumber
  }

  private static getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
  }

  private getRandomPlayer(): IPlayer {
    return Turn.getRandomIntInclusive(1, 100) < 50 ? this.player1 : this.player2
  }

  /**
   * allows to set the initial state of the Turn class to enable predictable testing
   * @internal
   */
  public setInitialState(
    playerID: IPlayerID,
    turnNumber: ITurnNumber = 1
  ): void {
    this.turnNumber = turnNumber
    if (this.player1.id === playerID) {
      this.turn = this.player1
    } else if (this.player2.id === playerID) {
      this.turn = this.player2
    }
  }
}
