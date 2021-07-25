var gameManager = (function() {
    'use strict';

    let _gameBoard = [];
    let _playerChar = 'x';
    let _cpuChar = 'o';
    let _emptyChar = "_";

    function _isBoardInTerminalState()
    {
        for(let i = 0; i < _gameBoard.length; i++)
        {
            for(let j = 0; j < _gameBoard[i].length; j++)
            {
                if(_gameBoard[i][j] == _emptyChar)
                {
                    return false;
                }
            }
        }

        return true;
    }

    function _minimax(isCpu, depth)
    {

        let score = _evaluateBoard();
        if(score == 10 || score == -10)
        {
            return score;
        }

        if(_isBoardInTerminalState())
        {
            return 0;
        }

        if(isCpu)
        {
            let bestValue = -Infinity;
            //As the cpu, look for an empty spot and make that move
            for(let i = 0; i < _gameBoard.length; i++)
            {
                for(let j = 0; j < _gameBoard[i].length; j++)
                {
                    if(_gameBoard[i][j] == _emptyChar)
                    {
                        _gameBoard[i][j] = _cpuChar;
                        
                        //now recursively go through the function again, but as the players turn
                        let value = _minimax(false, depth + 1);
                        bestValue = Math.max(bestValue, value);

                        _gameBoard[i][j] = _emptyChar;
                    }
                }
            }
            return bestValue + depth;
        }
        else
        {
            let bestValue = +Infinity;
            for(let i = 0; i < _gameBoard.length; i++)
            {
                for(let j = 0; j < _gameBoard[i].length; j++)
                {
                    if(_gameBoard[i][j] == _emptyChar)
                    {
                        _gameBoard[i][j] = _playerChar;
                        let value = _minimax(true, depth + 1);
                        bestValue = Math.min(bestValue, value);

                        _gameBoard[i][j] = _emptyChar;
                    }
                }
            }
            return bestValue - depth;
        }
        
    }

    function _findBestMove()
    {
        let row = "";
        let col = "";
        let bestValue = -Infinity;

        for(let i = 0; i < _gameBoard.length; i++)
        {
            for(let j = 0; j < _gameBoard[i].length; j++)
            {
                if(_gameBoard[i][j] == _emptyChar)
                {
                    //make a move
                    _gameBoard[i][j] = _cpuChar;

                    //evaluate score
                    let value = _minimax(false, 0);
                    console.log(`Value = ${value} at position ${i} ${j}`);

                    //undo move
                    _gameBoard[i][j] = _emptyChar;

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

        _gameBoard.push([_emptyChar,_emptyChar,_emptyChar]);
        _gameBoard.push([_emptyChar,_emptyChar,_emptyChar]);
        _gameBoard.push([_emptyChar,_emptyChar,_emptyChar]);
        
    }

    function playGame(){

        while(!_isBoardInTerminalState())
        {
            if(!_isBoardInTerminalState())
            {
                let usrTurn = window.prompt("Where would you like to play?", "row col");
                console.log(usrTurn);

                let usrSelection = usrTurn.split(' ');

                _gameBoard[usrSelection[0]][usrSelection[1]] = "x";
                printBoard();
            }
            

            const score = _evaluateBoard();
            if(score == -10)
            {
                console.log("You Win");
                return;
            }
            else if(score == 10)
            {
                console.log("Computer wins");
                return;
            }
            else if(_isBoardInTerminalState())
            {
                console.log("Tie");
                return;
            }

            if(!_isBoardInTerminalState())
            {
                let cpuMove = _findBestMove();
                _gameBoard[cpuMove[0]][cpuMove[1]] = "o";
                printBoard();
            }
            

        }
    }
 
    return {
        initGame: initGame,
        printBoard: printBoard,
        playGame: playGame
    };

  })();

  gameManager.initGame();
  gameManager.printBoard();
  gameManager.playGame();