import type { IPlayer2, IPlayer1, IPlayerID1, IPlayerID2 } from './interfaces'

export enum PlayerID {
  Player1 = 1,
  Player2 = 2,
}

export class Player1 implements IPlayer1 {
  private static instance: IPlayer1
  public readonly id: IPlayerID1
  public readonly name: string

  private constructor(name = 'PLAYER_1') {
    this.id = PlayerID.Player1
    this.name = name
  }

  public static getInstance(name?: string): IPlayer1 {
    if (!Player1.instance) {
      Player1.instance = new Player1(name)
    }
    return Player1.instance
  }
}

export class Player2 implements IPlayer2 {
  private static instance: IPlayer2
  public readonly id: IPlayerID2
  public readonly name: string

  private constructor(name = 'PLAYER_2') {
    this.id = PlayerID.Player2
    this.name = name
  }

  public static getInstance(name?: string): IPlayer2 {
    if (!Player2.instance) {
      Player2.instance = new Player2(name)
    }
    return Player2.instance
  }
}
