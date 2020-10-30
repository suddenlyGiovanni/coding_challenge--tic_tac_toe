import type { IPlayer2, IPlayer1, IPlayerID1, IPlayerID2 } from './interfaces'

export enum PlayerID {
  Player1 = 1,
  Player2 = 2,
}

export enum DefaultPlayerNames {
  Player1 = 'PLAYER_1',
  Player2 = 'PLAYER_2',
}

export class Player1 implements IPlayer1 {
  private static instance: Player1
  public readonly id: IPlayerID1
  private _name: string

  private constructor(name: string = DefaultPlayerNames.Player1) {
    this.id = PlayerID.Player1
    this._name = name
  }

  public static getInstance(name?: string): IPlayer1 {
    if (!Player1.instance) {
      Player1.instance = new Player1(name)
    }
    if (name) {
      Player1.instance._name = name
    }
    return Player1.instance
  }

  public get name(): string {
    return this._name
  }
}

export class Player2 implements IPlayer2 {
  private static instance: Player2
  public readonly id: IPlayerID2
  private _name: string

  private constructor(name: string = DefaultPlayerNames.Player2) {
    this.id = PlayerID.Player2
    this._name = name
  }

  public static getInstance(name?: string): IPlayer2 {
    if (!Player2.instance) {
      Player2.instance = new Player2(name)
    }
    if (name) {
      Player2.instance._name = name
    }
    return Player2.instance
  }

  public get name(): string {
    return this._name
  }
}
