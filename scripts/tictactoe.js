var gameManager = (function() {
    'use strict';

    let _gameBoard = [];
    let _playerChar = 'x';
    let _cpuChar = 'o';
    let _emptyChar = "_";

    let _winStates = {
        player: -10,
        cpu: 10,
        tie: 0
    }

    function _isBoardInTerminalState(gBoard)
    {
        for(let i = 0; i < gBoard.length; i++)
        {
            for(let j = 0; j < gBoard[i].length; j++)
            {
                if(gBoard[i][j] == _emptyChar)
                {
                    return false;
                }
            }
        }

        return true;
    }

    function _evaluateBoard(gBoard)
    {
        let winState = null;

        //Test for winning rows
        for(let i = 0; i < 3; i++)
        {
            if((gBoard[i][0] == gBoard[i][1]) && (gBoard[i][0] == gBoard[i][2]))
            {
                if(gBoard[i][0] == _playerChar)
                {
                    winState = "player";
                }
                else if(gBoard[i][0] == _cpuChar)
                {
                    winState = "cpu";
                }
            }
        }

        //Test for winning columns
        for(let i = 0; i < 3; i++)
        {
            if((gBoard[0][i] == gBoard[1][i]) && (gBoard[0][i] == gBoard[2][i]))
            {
                if(gBoard[0][i] == _playerChar)
                {
                    winState = "player";
                }
                else if(gBoard[0][i] == _cpuChar)
                {
                    winState = "cpu";
                }
            }
        }

        //Test for Diagonals
        if(((gBoard[0][0] == gBoard[1][1]) && (gBoard[0][0] == gBoard[2][2])) || ((gBoard[0][2] == gBoard[1][1]) && (gBoard[0][2] == gBoard[2][0]))  )
        {
            if(gBoard[1][1] == _playerChar)
            {
                winState = "player";
            }
            else if(gBoard[1][1] == _cpuChar)
            {
                winState = "cpu";
            }
        }


        //Check for ties
        if(winState == null && _isBoardInTerminalState(gBoard))
        {
            return "tie";
        }
        else
        {
            return winState;
        }
    }

    function _minimax(gBoard, isMaximizer)
    {
        let boardStatus = _evaluateBoard(gBoard);

        //if there is a tie, or either player is the winner, return
        if(boardStatus != null)
        {
            //console.log("winstate");
            return _winStates[boardStatus];
        }


        if(isMaximizer)
        {
            //Start with a low possible score
            let bestScore = -1000;

            //Go through every cell, if it's empty, put the cpu there and recursively call this function

            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    if(gBoard[i][j] == _emptyChar)
                    {
                        //do the cpu move
                        gBoard[i][j] = _cpuChar;

                        let score = _minimax(gBoard, false);

                        //undo the cpu move
                        gBoard[i][j] = _emptyChar;

                        bestScore = Math.max(score, bestScore);

                    }
                }
            }
            //console.log(bestScore);
            return bestScore;
        }
        else
        {
            //Start with a high possible score
            let bestScore = 1000;

            //Go through every cell, if it's empty, put the cpu there and recursively call this function

            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    if(gBoard[i][j] == _emptyChar)
                    {
                        //do the player(minimizer) move
                        gBoard[i][j] = _playerChar;

                        let score = _minimax(gBoard, true);

                        //undo the cpu move
                        gBoard[i][j] = _emptyChar;

                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            //console.log(bestScore);
            return bestScore;
        }
    }

    function _findBestMove(gBoard)
    {
        let bestScore = -1000;
        let bestRow = -1;
        let bestCol = -1;

        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                if(gBoard[i][j] == _emptyChar)
                {
                    gBoard[i][j] = _cpuChar;

                    let moveScore = _minimax(gBoard, false);

                    gBoard[i][j] = _emptyChar;

                    if(moveScore > bestScore)
                    {
                        bestScore = moveScore;
                        bestRow = i;
                        bestCol = j;
                    }

                }
            }
        }

        console.log(`Best move value is ${bestScore} at row ${bestRow} and col ${bestCol}`)

        return [bestRow, bestCol];

    }
  
    function printBoard(gBoard) {
      for(let i = 0; i < 3; i++)
      {
          let tempStr = "";
          for(let j = 0; j < 3; j++)
          {
              tempStr += `${gBoard[i][j]} `;
          }
          console.log(tempStr);
      }
    }

    function initGame() {

        _gameBoard.push([_emptyChar,_emptyChar,_emptyChar]);
        _gameBoard.push([_emptyChar,_emptyChar,_emptyChar]);
        _gameBoard.push([_emptyChar,_emptyChar,_emptyChar]);
        
    }

    function testEval() {

        let testBoardRowPlayer = [];
        let testBoardRowCpu = [];
        let testBoardColPlayer = [];
        let testBoardColCpu = [];
        let testBoardDiaPlayer = [];
        let testBoardDiaCpu = [];
        let testBoardTie0 = [];
        let testBoardUnfinishedGame = [];

        testBoardRowPlayer.push([_emptyChar,_emptyChar,_emptyChar]);
        testBoardRowPlayer.push([_playerChar,_playerChar,_playerChar]);
        testBoardRowPlayer.push([_emptyChar,_emptyChar,_emptyChar]);
        
        testBoardRowCpu.push([_emptyChar,_emptyChar,_emptyChar]);
        testBoardRowCpu.push([_emptyChar,_emptyChar,_emptyChar]);
        testBoardRowCpu.push([_cpuChar,_cpuChar,_cpuChar]);

        testBoardColPlayer.push([_playerChar,_emptyChar,_emptyChar]);
        testBoardColPlayer.push([_playerChar,_emptyChar,_emptyChar]);
        testBoardColPlayer.push([_playerChar,_emptyChar,_emptyChar]);

        testBoardColCpu.push([_emptyChar,_cpuChar,_emptyChar]);
        testBoardColCpu.push([_emptyChar,_cpuChar,_emptyChar]);
        testBoardColCpu.push([_emptyChar,_cpuChar,_emptyChar]);

        testBoardDiaPlayer.push([_playerChar,_emptyChar,_emptyChar]);
        testBoardDiaPlayer.push([_emptyChar,_playerChar,_emptyChar]);
        testBoardDiaPlayer.push([_emptyChar,_emptyChar,_playerChar]);

        testBoardDiaCpu.push([_emptyChar,_emptyChar,_cpuChar]);
        testBoardDiaCpu.push([_emptyChar,_cpuChar,_emptyChar]);
        testBoardDiaCpu.push([_cpuChar,_emptyChar,_emptyChar]);

        testBoardTie0.push([_playerChar,_cpuChar,_playerChar]);
        testBoardTie0.push([_playerChar,_cpuChar,_cpuChar]);
        testBoardTie0.push([_cpuChar,_playerChar,_playerChar]);

        testBoardUnfinishedGame.push([_emptyChar,_emptyChar,_emptyChar]);
        testBoardUnfinishedGame.push([_emptyChar,_cpuChar,_emptyChar]);
        testBoardUnfinishedGame.push([_emptyChar,_emptyChar,_emptyChar]);


        printBoard(testBoardRowPlayer);
        console.log(_evaluateBoard(testBoardRowPlayer));
        printBoard(testBoardRowCpu);
        console.log(_evaluateBoard(testBoardRowCpu));
        printBoard(testBoardColPlayer);
        console.log(_evaluateBoard(testBoardColPlayer));
        printBoard(testBoardColCpu);
        console.log(_evaluateBoard(testBoardColCpu));
        printBoard(testBoardDiaPlayer);
        console.log(_evaluateBoard(testBoardDiaPlayer));
        printBoard(testBoardDiaCpu);
        console.log(_evaluateBoard(testBoardDiaCpu));
        printBoard(testBoardTie0);
        console.log(_evaluateBoard(testBoardTie0));
        printBoard(testBoardUnfinishedGame);
        console.log(_evaluateBoard(testBoardUnfinishedGame));


        let testMini = [];
        testMini.push([_emptyChar,_emptyChar,_emptyChar]);
        testMini.push([_emptyChar,_emptyChar,_emptyChar]);
        testMini.push([_emptyChar,_emptyChar,_playerChar]);

        _findBestMove(testMini);

    }

    function playGame() {

        printBoard(_gameBoard);
        while(_evaluateBoard(_gameBoard) == null)
        {
            
            printBoard(_gameBoard);

            let cpuMove = _findBestMove(_gameBoard);

            _gameBoard[cpuMove[0]][cpuMove[1]] = _cpuChar;
            printBoard(_gameBoard);

            let playerMoveString = window.prompt("Make a move", "Row Column");
            let playerMove = playerMoveString.split(" ");

            _gameBoard[playerMove[0]][playerMove[1]] = _playerChar;
        }  

        let winner = _evaluateBoard(_gameBoard);
        console.log(`Winner is ${winner}`);
    }
 
    return {
        initGame: initGame,
        printBoard: printBoard,
        playGame: playGame,
        testEval: testEval
    };

  })();

  gameManager.initGame();
  gameManager.playGame();