var domManager = (function() {
    'use strict';

    let _body = null;
    let _flex = null;
    let _title = null;
    let _subTitle = null;
    let _winStatus = null;

    function _boardSpaceClicked(evt) {

        console.dir(evt);

        let selectedRow = evt.target.dataset.row;
        let selectedColumn = evt.target.dataset.column;

        let playerMove = moveFactory(selectedRow, selectedColumn);

        let cpuReturnMove  = gameManager.playMove(playerMove);

        //if a valid move
        if(cpuReturnMove != null)
        {
            //and the player hasn't won, which means there is a cpu move
            if(cpuReturnMove.status != "player")
            {
                //style the players move
                let xText = evt.target.querySelector(".space-text");
                xText.classList.add("board-X");
                xText.innerText = "X";

                if(cpuReturnMove.status != "tie")
                {
                    //style the cpu move
                    let board_spaces = _body.querySelectorAll(".board-space");
                    for(let i = 0; i < board_spaces.length; i++)
                    {
                        if((board_spaces[i].dataset.row == cpuReturnMove.move.row) && (board_spaces[i].dataset.column == cpuReturnMove.move.column))
                        {
                            let spaceText = board_spaces[i].querySelector(".space-text");
                            spaceText.classList.add("board-O");
                            spaceText.innerText = "O";
                            break;
                        }
                    }
                }  
            }

            if(cpuReturnMove.status != null)
            {
                _setWinStatus(cpuReturnMove.status);
            }
        }
    }

    function _resetGame(evt)
    {
        gameManager.reset();

        let spaces = _body.querySelectorAll(".space-text");
        for(let i = 0; i < spaces.length; i++)
        {
            spaces[i].innerText = "";
            spaces[i].classList.remove("board-O");
            spaces[i].classList.remove("board-X");
        }

        _setWinStatus(null);
    }

    function _createFlex() {

        _flex = document.createElement("div");
        _flex.classList.add("flex-container");

        _title = document.createElement("h1");
        _title.classList.add("ttt-title");
        _title.innerText = "Tic Tac Toe";

        let subBanner = document.createElement("div");
        subBanner.classList.add("sub-banner");

        let man = document.createElement("div");
        man.classList.add("player-badge");

        let ai = document.createElement("div");
        ai.classList.add("ai-badge");



        _subTitle = document.createElement("h2");
        _subTitle.classList.add("ttt-subtitle");
        _subTitle.innerText = "Man vs Machine";

        subBanner.appendChild(man);
        subBanner.appendChild(_subTitle);
        subBanner.appendChild(ai);

        let resetButton = document.createElement("button");
        resetButton.classList.add("reset-button");
        resetButton.classList.add("button");
        resetButton.addEventListener("click", _resetGame);

        _flex.appendChild(_title);
        _flex.appendChild(subBanner);
        _flex.append(resetButton);
        _body.appendChild(_flex);

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
                space.classList.add(`space${i}${j}`);
                let spaceId = i.toString() + "-" + j.toString();
                space.dataset.row = i;
                space.dataset.column = j;

                grid.addEventListener("click", _boardSpaceClicked)

                let spaceText = document.createElement("div");
                spaceText.classList.add("space-text");

                space.appendChild(spaceText);

                grid.appendChild(space);
            }
        }

        _flex.appendChild(grid);
    }

    function _createWinStatus() {

        _winStatus = document.createElement("h3");
        _winStatus.classList.add("ttt-winStatus");

        _flex.appendChild(_winStatus);

    }

    function _setWinStatus(status)
    {

        switch(status)
        {
            case "player":
            {
                _winStatus.innerText = "You have bested the machine!"
                break;
            }
            case "cpu":
            {
                _winStatus.innerText = "The Machine has prevailed!"
                break;
            }
            case "tie":
            {
                _winStatus.innerText = "Stalemate. Better luck next time."
                break;
            }
            case null:
            {
                _winStatus.innerText = ""
                break;
            }
        }

    }

    function init()
    {
        _body = document.querySelector("body");
        _createFlex();
        _createBoard();
        _createWinStatus();
    }



    return {

        init: init
    };


  })();

