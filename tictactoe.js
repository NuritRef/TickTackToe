let boardArr = []
let rowArr = []
let dimension = 3
let players = [{name:null,state:null},{name:null,state:null}]
let states = ["❌","🔴"]
let curPlayer ;
let isEndGame = false
let steps = 0
let playerA;
let playerB;
let savedGame;
let timer;


let timerElem = document.getElementById("timer")
let startScreen = document.getElementById("startScreen")
let btnStart = document.getElementById("btnStart") 
let gameScreen = document.getElementById("gameScreen")
let gameTable = document.getElementById("gameTable")
let playersScreen = document.getElementById("players")
let winScreen = document.getElementById("winGameScreen")
// let playerA = document.getElementById("player1")
// let playerB = document.getElementById("player2")

let restartBtn = document.getElementById("btnRestart")
let saveBtn = document.getElementById("btnSave")
let loadBtn = document.getElementById("btnLoad")
let showRecordsBtn = document.getElementById("btnShowRecord")
let deleteStepBtn = document.getElementById("btnDeleteStep")
let ChangeDimBtn = document.getElementById("btnChangeDim")



function  timerF(){
    let totSec = 0
    timer = setInterval(function () {
        totSec ++
        let hour = Math.floor(totSec / 3600);
        let minute = Math.floor((totSec - hour * 3600) / 60);
        var seconds = totSec - (hour * 3600 + minute * 60);
        timerElem.innerHTML = hour.padStart(2,"0") + ":" + minute.padStart(2,"0") + ":" + seconds.padStart(2,"0");
      }, 1000);
}


function changePlayer(){
    if (curPlayer==players[0]){
        curPlayer=players[1]
    }
    else{curPlayer=players[0]}
}


function  winGame(){
    // TODO: blink the winners squares
    clearInterval(timer)
    setTimeout(function(){
        gameScreen.style.display = "none"
        winScreen.innerText = "woohooo there is a winner"
        winScreen.style.display = "flex"
        },1000)
    
}


function isEndOfGame(){
    let isEnd = false
    // rows test
    let checkRows = boardArr.map(row=>row.every((square, i, row) => square.state === row[0].state && square.state!= null ))
    isEnd = checkRows.includes(true)
    if(isEnd){return true}
    
    // collums test
    let cols = boardArr[0].map((e, i) => boardArr.map(row => row[i]));
    let checkCols = cols.map(row=>row.every((square, i, row) => square.state === row[0].state && square.state!= null ))
    isEnd = checkCols.includes(true)
    if(isEnd){return true}
    
    // diagonal1 test
    let diagonal1 = boardArr.map((row,i)=>row[i].state)
    isEnd = diagonal1.every(square => square === diagonal1[0] && square!= null)
    if(isEnd){return true}
    
    // diagonal2 test
    let diagonal2 = [...boardArr].reverse().map((row,i)=>row[i].state)
    isEnd = diagonal2.every(square => square === diagonal2[0] && square!= null)

    return isEnd
    
}

let singleTurn = function(e){
    e.target.classList.add("isFlipped")
    e.target.innerText = curPlayer.state
    e.target.onclick = null
    steps ++
    let curLocRow = Number(e.target.id[0])
    let curLocCol = Number(e.target.id[2])
    boardArr[curLocRow][curLocCol].state = curPlayer.state
    boardArr[curLocRow][curLocCol].stepNum = steps
    endOfGame = isEndOfGame()
    if (endOfGame){
        winGame()
        console.log("woohoo there is a winner!!")
    }
    else{changePlayer()}  
}


// this function init the board array according to the dimension
function initBoardArr(){
    for ( let i=0;i<dimension;i++){
        for (let j=0;j<dimension;j++){
            rowArr.push({state:null,stepNum:0})
        }
        boardArr.push(rowArr)
        rowArr = []
    }
}


// this function initialize all squares on the game table with onclick for each
function initBoardScreen(){
    for (i=0;i<boardArr.length;i++){
        for(j=0;j<boardArr.length;j++){
            let square = document.createElement("div")
            square.className = "square"
            square.id = `${i}_${j}`
            gameTable.appendChild(square)
            front = document.createElement("div")
            back = document.createElement("div")
            front.className="frontSquare"
            back.className="backSquare"
            square.append(front,back)
            square.onclick = singleTurn
        }
    }
}


// init players object
function addPlayers(){
    playerAState = states[Math.floor(Math.random() * players.length)]
    players[0].state = playerAState
    playerBState = players[0].state == states[0] ? states[1] : states[0]    
    players[1].state = playerBState
    curPlayer = players[0]
}


// init players screen
function initPlayersScreen(){
    playerA = document.createElement("div")
    playerA.className ="player" 
    playerA.id = "playerA"
    playerB = document.createElement("div")
    playerB.className = "player"
    playerB.id = "playerB"
    playerA.innerText = `Player A: ${playerAState}`
    playerB.innerText = `Player B: ${playerBState}`
    playersScreen.append(playerA,playerB)  

}

// this function turn on the game by sending to other funcs: build the board array, deal with players, deal with board screen.
function game(){
    initBoardArr()
    initBoardScreen()
    addPlayers()
    initPlayersScreen()
    timerF()
    gameScreen.style.display = "flex"
}

// this function is called first, dealls with start screen inputs/buttons and send to start game function when buttons is clicked.
function startGameScreen(){
    //TODO: add more inputs
    btnStart.onclick = function(){
        startScreen.style.display = 'none'
        game()
    }
}

startGameScreen()


// -----------------------------------------------------------------------------------------
// buttons-


restartBtn.onclick = function(){
    boardArr = []
    players = [{name:null,state:null},{name:null,state:null}]
    gameTable.replaceChildren()
    playersScreen.replaceChildren()
    game()
}


saveBtn.onclick = function () {
    savedGame = {
        "gameTable" : gameTable.cloneNode(true),
        "boardArr" : structuredClone(boardArr), 
        "players" : structuredClone(players), 
        "dimension" : dimension, 
        "playerA" : playerA, 
        "playerB" : playerB,
        "curPlayer" : players.indexOf(curPlayer), 
        "steps" : steps
    }
}


loadBtn.onclick = function (){
    // init variables
    boardArr = savedGame.boardArr
    players = savedGame.players
    dimension = savedGame.dimension
    curPlayer = players[savedGame.curPlayer]
    steps = savedGame.steps

    // change screen according to variables
    gameScreen.replaceChild(savedGame.gameTable,gameTable)
    plainSquares = document.querySelectorAll('.square:not(.isFlipped)')
    for (s of plainSquares){
        s.onclick = singleTurn
    };    
}


deleteStepBtn.onclick = function(){
    // update all varibales with step back
    let loc = ""
    for (i=0;i<boardArr.length;i++){
        for(j=0;j<boardArr.length;j++){
            if (boardArr[i][j].stepNum == steps){
                loc = `${i}_${j}`
                console.log(loc)
                steps --
                boardArr[i][j].stepNum = 0
                boardArr[i][j].state = null
            }
        }
    }
    changePlayer()

    // update element with step back 
    lastStepElem = document.getElementById(loc)
    console.log(lastStepElem)
    lastStepElem.classList.remove("isFlipped")
    lastStepElem.innerText = ""
    lastStepElem.onclick = singleTurn


}


// function  showRecordsBtn(){
// // TODO: orit

// }
// function  changeDimBtn(){ //change the const dimension{
// // TODO: orit

// }

// להעלות רק כשאורית צריכה לעבוד
// css: אם אני עושה שינויים לעשות בתוך ה- html


