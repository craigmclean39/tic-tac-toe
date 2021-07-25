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

    function _minimax(gameBoard, isCpu, depth)
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
                        let value = _minimax(gameBoard, false, depth + 1);
                        bestValue = Math.max(bestValue, value);

                        gameBoard[i][j] = _emptyChar;
                    }
                }
            }
            return bestValue + depth;
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
                        let value = _minimax(gameBoard, true, depth + 1);
                        bestValue = Math.min(bestValue, value);

                        _gameBoard[i][j] = _emptyChar;
                    }
                }
            }
            return bestValue - depth;
        }
        
    }

    function _findBestMove(gameBoard)
    {
        let row = "";
        let col = "";
        let bestValue = -Infinity;

        for(let i = 0; i < gameBoard.length; i++)
        {
            for(let j = 0; j < gameBoard[i].length; j++)
            {
                if(gameBoard[i][j] == _emptyChar)
                {
                    gameBoard[i][j] = _cpuChar;
                    let value = _minimax(gameBoard, false, 0);
                    gameBoard[i][j] = _emptyChar;

                    if(value > bestValue)
                    {
                        bestValue = value;
                        col = i;
                        row = j;
                    }
                }
            }
        }

        console.log(`Best Value = ${bestValue} at position ${col} ${row}`);

        return [col, row];
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

        while(!_isBoardInTerminalState(_gameBoard))
        {
            let usrTurn = window.prompt("Where would you like to play?", "row col");
            console.log(usrTurn);

            let usrSelection = usrTurn.split(' ');

            _gameBoard[usrSelection[0]][usrSelection[1]] = "x";
            printBoard();

            let cpuMove = _findBestMove(_gameBoard);
            _gameBoard[cpuMove[0]][cpuMove[1]] = "o";
            printBoard();

            const score = _evaluateBoard(_gameBoard);
            if(score == 10)
            {
                console.log("You Win");
                return;
            }
            else if(score == -10)
            {
                console.log("Computer wins");
                return;
            }
            else if(_isBoardInTerminalState(_gameBoard))
            {
                console.log("Tie");
                return;
            }

        }
        

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