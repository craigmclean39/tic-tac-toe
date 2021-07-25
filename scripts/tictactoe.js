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

    function _minimax(gBoard, isMaximizer)
    {

       
        
    }

    function _findBestMove()
    {

    }

    function _evaluateBoard()
    {
        
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