import { Board, BoardState } from 'model/board'
import { CellID } from 'model/cell'
import {
  IBoard,
  IMatch,
  IMatchState,
  IObserver,
  IPlayer1,
  IPlayer2,
  ISubject,
  ITurn,
} from 'model/interfaces'
import { DefaultPlayerNames, Player1, Player2 } from 'model/player'
import { Turn } from 'model/turn'

export class Match implements IMatch, ISubject<IMatchState> {
  private static instance: Match

  private observers: IObserver<IMatchState>[]
  public readonly turn: ITurn

  public readonly board: IBoard
  public readonly player1: IPlayer1

  public readonly player2: IPlayer2

  private constructor(
    player1Name: string = DefaultPlayerNames.Player1,
    player2Name: string = DefaultPlayerNames.Player2
  ) {
    this.player1 = Player1.getInstance(player1Name)
    this.player2 = Player2.getInstance(player2Name)
    this.observers = []
    this.turn = new Turn(this.player1, this.player2)
    this.board = Board.getInstance()
  }

  public notifyObservers(): void {
    this.observers.forEach((observer) => {
      observer.update(this.board.getBoardState())
    })
  }

  public registerObserver(observer: IObserver<IMatchState>): void {
    this.observers.push(observer)
  }

  public removeObserver(observer: IObserver<IMatchState>): void {
    const index = this.observers.indexOf(observer)
    this.observers.splice(index, 1)
  }

  public move(cellID: CellID): void {
    const MAX_TURN_NUMBER = 9
    if (MAX_TURN_NUMBER >= this.turn.number) {
      this.board.setCellState(cellID, this.turn.get()) // this could throw
      const state = this.board.getBoardState()
      if (state === BoardState.playing) {
        this.turn.next()
      }
      this.notifyObservers()
    } else {
      throw new Error('Turn overflow: A Match can last a maximum of 9 rounds.')
    }
  }

  public reset(): void {
    this.board.reset()
    this.turn.reset()
    this.notifyObservers()
  }

  public static getInstance(player1Name?: string, player2Name?: string): Match {
    if (!Match.instance) {
      Match.instance = new Match(player1Name, player2Name)
    }
    return Match.instance
  }
}
