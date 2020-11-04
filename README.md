# Tic-Tac-Toe Game

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Requirements

- Use your own code only and start from scratch
- Player can choose the opponent to be human or computer
- Use [L]GPL’ed libraries if necessary; please include copyright notes
- track the time it took you to code the game
- Implement in Javascript so that it works in Mozilla Firefox
- Make use of CSS, provide nice visuals

## Solution

TLDR:

- I choose Typescript as language,
- React as View library,
- MVVM for architecture,
- TDD as development practice (hight code coverage),
- OOP for the model.

### Design

These are the semantic pieces that I used to define the domain model:

- IMatch
- IPlayer1 | ( IPlayer2 | IProgram )
- IBoard
- ICell
- ITurn

#### `class Player implements IPlayer {...}`

Some statements that belong to the player:

- there are only two players at a time
- a player has a unique id
- a player might have a name

#### `class Match implements IMatch, ISubject {...}`

Some statements that belong to the match:

- there could only be one match at the time.
- a match is between two players or between a player and a program.
- a match is responsible for keeping track of the player's tuns
- a match is played until an end condition is met: `PlayerID1WinState` | `PlayerID2WinState` | `DrawState`
- a match has a board
- a match is responsible for deciding if a winning condition has been met based on the board state

The Match class creates an instance of a board, two players, and the turn class.
It is responsible for validating a player move, updating the board, and the turn. It is also accountable for identifying when someone has won and communicating the new state to all the match subscribers.

#### `class Board implements IBoard {...}`

Some statements that belong to the board:

- there is only one board
- a board is composed of 9 cells

The board is a state machine that keeps tracks of different game states. The possible states of the board are: (PLAYING, PLAYER1_WINS, PLAYER2_WINS, DRAW ).

The board is aware of the state of each cell (empty or not).

The board can tell if a given cell is empty.

The board is also able to check if someone has won or tied the match.

#### `class Cell implements ICell {...}`

Some statements that belong to the cell:

- a cell has a unique id
- a could only be in 3 states: `Empty` | `Player1` | `Player2`
- a cell state can only be modified if the cell is `Empty`

#### `class Turn implements ITurn {...}`

Some statements that belong to the turn:

- a turn is responsible for keeping track of which player is currently active
- a turn tracks the number of turns

### TODOs and possible Improvements

TODOS:

- I haven't implemented yet the option to play against a program.

Possible future improvements:

- performance optimization for the React component tree
- end2end testing with Cypress

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install:

- node v15.0.1 => you can do it with volta.sh (an alternative to NVM)
- yarn v2

```shell
curl https://get.volta.sh | bash

volta install node@latest
```

To install yarn v2, please refer to the official docs [here](https://yarnpkg.com/getting-started/install)

### Clone the repo

```shell
git clone git@github.com:suddenlyGiovanni/coding_challenge--tic_tac_toe.git
cd coding_challenge--tic_tac_toe
```

### Install the dependencies

```shell
yarn install
```

## Run the Project

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

## Built With

- [Create React App](https://github.com/facebook/create-react-app).
- [TypeScript] - Typed JavaScript at Any Scale.
- [Yarn v2] - Package Manager
- [Jest] - JavaScript testing framework
- [Wallaby] - A tests runner

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[typescript]: https://www.typescriptlang.org
[yarn v2]: https://classic.yarnpkg.com/lang/en/
[jest]: https://jestjs.io
[wallaby]: https://wallabyjs.com
