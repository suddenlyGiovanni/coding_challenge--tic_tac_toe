import { Board } from 'model/board'
import { CellID } from 'model/cell'
import type {
  IBoard,
  IMatch,
  IMatchStatus,
  IObserver,
  IPlayer1,
  IPlayer2,
  ISubject,
  ITurn,
} from 'model/interfaces'
import { Player1, Player2, PlayerID } from 'model/player'
import { Turn } from 'model/turn'

export class Match implements IMatch, ISubject<IMatchStatus> {
  private static instance: Match

  private observers: IObserver<IMatchStatus>[]
  public readonly turn: ITurn

  public readonly board: IBoard
  public readonly player1: IPlayer1

  public readonly player2: IPlayer2
  public readonly status: 'playing' | 'complete'

  private constructor(player1Name = 'PLAYER_1', player2Name = 'PLAYER_2') {
    this.player1 = Player1.getInstance(player1Name)
    this.player2 = Player2.getInstance(player2Name)
    this.observers = []
    this.status = 'playing'
    this.turn = new Turn(this.player1, this.player2)
    this.board = Board.getInstance()
  }

  public notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update({}) // TODO: add correct IMatchStatus data
    }
  }

  public registerObserver(observer: IObserver<IMatchStatus>): void {
    this.observers.push(observer)
  }

  public removeObserver(observer: IObserver<IMatchStatus>): void {
    const index = this.observers.indexOf(observer)
    this.observers.splice(index, 1)
  }

  public move(player: PlayerID, cell: CellID): void {
    // validate action against turn (is the correct player)
    // validate player move (is said move valid)
    // apply move to the board
    // check for move status (continue | end)
    // if continue switch turn
    // if end verify end case
    this.notifyObservers()
  }

  public init(): void {
    throw new Error('Method not implemented.')
  }
  public reset(): void {
    throw new Error('Method not implemented.')
  }

  public static getInstance(player1Name?: string, player2Name?: string): Match {
    if (!Match.instance) {
      Match.instance = new Match(player1Name, player2Name)
    }
    return Match.instance
  }
}
