const moveFactory = (row, column) => {
    
    return { row, column };
  };


const returnMoveFactory = (status, move) => {

    return {status, move};
};


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

        //console.log(`Best move value is ${bestScore} at row ${bestRow} and col ${bestCol}`)

        return [bestRow, bestCol];

    }

    function initGame() {

        _gameBoard.push([_emptyChar,_emptyChar,_emptyChar]);
        _gameBoard.push([_emptyChar,_emptyChar,_emptyChar]);
        _gameBoard.push([_emptyChar,_emptyChar,_emptyChar]);
        
    }

    function playMove(move) {
        //play a given move and return a cpu move, or invalid move, or game winning status


        let returnMove = undefined;
        //check if the move is valid
        if(_gameBoard[move.row][move.column] == _emptyChar)
        {
            //This is a valid move, make the move
            _gameBoard[move.row][move.column] = _playerChar;


            let cpuMove = _findBestMove(_gameBoard);
            _gameBoard[cpuMove[0]][cpuMove[1]] = _cpuChar;
            let winState = _evaluateBoard(_gameBoard);


            returnMove = returnMoveFactory(winState, moveFactory(cpuMove[0], cpuMove[1]));


            return returnMove;
        }
        else{

        }



    }

    /* function playGame() {

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
    } */
 
    return {
        initGame: initGame,
        playMove: playMove
    };

  })();




  var domManager = (function() {
    'use strict';

    let _body = null;

    function _boardSpaceClicked(evt) {

        console.dir(evt);

        let selectedRow = evt.target.dataset.row;
        let selectedColumn = evt.target.dataset.column;

        let playerMove = moveFactory(selectedRow, selectedColumn);

        let cpuReturnMove  = gameManager.playMove(playerMove);

        //if a valid move
        if(cpuReturnMove.status == null)
        {
            //style the players move
            evt.target.classList.add("board-X");

            //style the cpu move
            let board_spaces = _body.querySelectorAll(".board-space");
            for(let i = 0; i < board_spaces.length; i++)
            {
                if((board_spaces[i].dataset.row == cpuReturnMove.move.row) && (board_spaces[i].dataset.column == cpuReturnMove.move.column))
                {
                    board_spaces[i].classList.add("board-O");
                    break;
                }
            }



        }


    }

    function _createBoard() {

        let grid = document.createElement("div");
        grid.classList.add("grid-board");


        //Create the 9 grid spaces, give them a unique id in their data attribute and attach event listeners
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                let space = document.createElement("div");
                space.classList.add("board-space");
                let spaceId = i.toString() + "-" + j.toString();
                space.dataset.row = i;
                space.dataset.column = j;

                grid.addEventListener("click", _boardSpaceClicked)

                grid.appendChild(space);
            }
        }

        _body.appendChild(grid);
        

    }

    function init()
    {
        _body = document.querySelector("body");
        _createBoard();


    }



    return {

        init: init
    };


  })();


  gameManager.initGame();
  domManager.init();
  //gameManager.playGame();