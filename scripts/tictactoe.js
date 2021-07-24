var gameState = (function() {
    'use strict';

    let _gameBoard = [];
  
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
    
      return {
        initGame: initGame,
        printBoard: printBoard
      };
  })();

  gameState.initGame();
  gameState.printBoard();