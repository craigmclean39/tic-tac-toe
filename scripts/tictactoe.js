var gameState = (function() {
    'use strict';

    let _gameBoard = [];
    let _playerChar = 'x';
    let _cpuChar = 'o';

    function _evaluateBoard()
    {
        //check columns for win condition
        if(_gameBoard[0][0] == _gameBoard[0][1] && _gameBoard[0][0] == _gameBoard[0][2])
        {
            if(_gameBoard[0][0] == _playerChar)
            {
                //player wins
                return -10;
            }
            else if(_gameBoard[0][0] == _cpuChar)
            {
                //cpu wins
                return 10;
            }
        }
        else if(_gameBoard[1][0] == _gameBoard[1][1] && _gameBoard[1][0] == _gameBoard[1][2])
        {
            if(_gameBoard[1][0] == _playerChar)
            {
                return -10;
            }
            else if(_gameBoard[1][0] == _cpuChar)
            {
                return 10;
            }
        }
        else if(_gameBoard[2][0] == _gameBoard[2][1] && _gameBoard[2][0] == _gameBoard[2][2])
        {
            if(_gameBoard[2][0] == _playerChar)
            {
                return -10;
            }
            else if(_gameBoard[2][0] == _cpuChar)
            {
                return 10;
            }
        }

        //check rows for win condition
        if(_gameBoard[0][0] == _gameBoard[1][0] && _gameBoard[0][0] == _gameBoard[2][0])
        {
            if(_gameBoard[0][0] == _playerChar)
            {
                return -10;
            }
            else if(_gameBoard[0][0] == _cpuChar)
            {
                return 10;
            }
        }
        else if(_gameBoard[0][1] == _gameBoard[1][1] && _gameBoard[0][1] == _gameBoard[2][1])
        {
            if(_gameBoard[0][1] == _playerChar)
            {
                return -10;
            }
            else if(_gameBoard[0][1] == _cpuChar)
            {
                return 10;
            }
        }
        else if(_gameBoard[0][2] == _gameBoard[1][2] && _gameBoard[0][2] == _gameBoard[2][2])
        {
            if(_gameBoard[0][2] == _playerChar)
            {
                return -10;
            }
            else if(_gameBoard[0][2] == _cpuChar)
            {
                return 10;
            }
        }

        //check diagonals for win condition
        if(_gameBoard[0][0] == _gameBoard[1][1] && _gameBoard[0][0] == _gameBoard[2][2])
        {
            if(_gameBoard[0][0] == _playerChar)
            {
                return -10;
            }
            else if(_gameBoard[0][0] == _cpuChar)
            {
                return 10;
            }
        }
        else if(_gameBoard[0][2] == _gameBoard[1][1] && _gameBoard[0][2] == _gameBoard[2][0])
        {
            if(_gameBoard[0][2] == _playerChar)
            {
                return -10;
            }
            else if(_gameBoard[0][2] == _cpuChar)
            {
                return 10;
            }
        }

        return 0;
    }
  
    function printBoard() {
      for(let i = 0; i < _gameBoard.length; i++)
      {
          let tempStr = "";
          for(let j = 0; j < _gameBoard.length; j++)
          {
              tempStr += `${_gameBoard[i][j]} `;
          }
          console.log(tempStr);
      }
    }

    function initGame() {

        _gameBoard.push(["_","_","_"]);
        _gameBoard.push(["_","_","_"]);
        _gameBoard.push(["_","_","_"]);
        
    }

    function playGame(){

        let usrTurn = window.prompt("Where would you like to play?", "col row");
        console.log(usrTurn);

        let usrSelection = usrTurn.split(' ');

        _gameBoard[usrSelection[0]][usrSelection[1]] = "x";
        printBoard();

        console.log(`Evaluate: ${_evaluateBoard()}`);

    }


    
    return {
        initGame: initGame,
        printBoard: printBoard,
        playGame: playGame
    };

  })();

  gameState.initGame();
  gameState.printBoard();
  gameState.playGame();