var gameState = (function() {
    'use strict';

    let _gameBoard = [];
    let _playerChar = 'x';
    let _cpuChar = 'o';
    let _emptyChar = "_";

    function _isBoardInTerminalState(gameBoard)
    {
        for(let i = 0; i < gameBoard.length; i++)
        {
            for(let j = 0; j < gameBoard[i].length; j++)
            {
                if(gameBoard[i][j] == _emptyChar)
                {
                    return false;
                }
            }
        }

        return true;
    }

    function _minimax(gameBoard, isCpu)
    {
        if(_isBoardInTerminalState(gameBoard))
        {
            return _evaluateBoard(gameBoard);
        }

        if(isCpu)
        {
            let bestValue = -Infinity;
            //As the cpu, look for an empty spot and make that move
            for(let i = 0; i < gameBoard.length; i++)
            {
                for(let j = 0; j < gameBoard[i].length; j++)
                {
                    if(gameBoard[i][j] == _emptyChar)
                    {
                        gameBoard[i][j] = _cpuChar;
                        
                        //now recursively go through the function again, but as the players turn
                        let value = _minimax(gameBoard, false);
                        bestValue = Math.max(bestValue, value);
                    }
                }
            }
            return bestValue;
        }
        else
        {
            let bestValue = +Infinity;
            for(let i = 0; i < gameBoard.length; i++)
            {
                for(let j = 0; j < gameBoard[i].length; j++)
                {
                    if(gameBoard[i][j] == _emptyChar)
                    {
                        gameBoard[i][j] = _playerChar;
                        let value = _minimax(gameBoard, true);
                        bestValue = Math.min(bestValue, value);
                    }
                }
            }
            return bestValue;
        }
        
    }

    function _evaluateBoard(gameBoard)
    {
        //check columns for win condition
        if(gameBoard[0][0] == gameBoard[0][1] && gameBoard[0][0] == gameBoard[0][2])
        {
            if(gameBoard[0][0] == _playerChar)
            {
                //player wins
                return -10;
            }
            else if(gameBoard[0][0] == _cpuChar)
            {
                //cpu wins
                return 10;
            }
        }
        else if(gameBoard[1][0] == gameBoard[1][1] && gameBoard[1][0] == gameBoard[1][2])
        {
            if(gameBoard[1][0] == _playerChar)
            {
                return -10;
            }
            else if(gameBoard[1][0] == _cpuChar)
            {
                return 10;
            }
        }
        else if(gameBoard[2][0] == gameBoard[2][1] && gameBoard[2][0] == gameBoard[2][2])
        {
            if(gameBoard[2][0] == _playerChar)
            {
                return -10;
            }
            else if(gameBoard[2][0] == _cpuChar)
            {
                return 10;
            }
        }

        //check rows for win condition
        if(gameBoard[0][0] == gameBoard[1][0] && gameBoard[0][0] == gameBoard[2][0])
        {
            if(gameBoard[0][0] == _playerChar)
            {
                return -10;
            }
            else if(gameBoard[0][0] == _cpuChar)
            {
                return 10;
            }
        }
        else if(gameBoard[0][1] == gameBoard[1][1] && gameBoard[0][1] == gameBoard[2][1])
        {
            if(gameBoard[0][1] == _playerChar)
            {
                return -10;
            }
            else if(gameBoard[0][1] == _cpuChar)
            {
                return 10;
            }
        }
        else if(gameBoard[0][2] == gameBoard[1][2] && gameBoard[0][2] == gameBoard[2][2])
        {
            if(gameBoard[0][2] == _playerChar)
            {
                return -10;
            }
            else if(gameBoard[0][2] == _cpuChar)
            {
                return 10;
            }
        }

        //check diagonals for win condition
        if(gameBoard[0][0] == gameBoard[1][1] && gameBoard[0][0] == gameBoard[2][2])
        {
            if(gameBoard[0][0] == _playerChar)
            {
                return -10;
            }
            else if(gameBoard[0][0] == _cpuChar)
            {
                return 10;
            }
        }
        else if(gameBoard[0][2] == gameBoard[1][1] && gameBoard[0][2] == gameBoard[2][0])
        {
            if(gameBoard[0][2] == _playerChar)
            {
                return -10;
            }
            else if(gameBoard[0][2] == _cpuChar)
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

        //console.log(`Evaluate: ${_evaluateBoard()}`);

        console.log(_minimax(_gameBoard, true));

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