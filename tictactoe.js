let boardArr = []
let rowArr = []
let dimension = 3
let players = [{name:null,state:null},{name:null,state:null}]
let states = ["❌","🔴"]
let curPlayer = players[0]
let isEndGame = false
let steps = 0


let startScreen = document.getElementById("startScreen")
let btnStart = document.getElementById("btnStart") 
let gameScreen = document.getElementById("gameScreen")
let gameTable = document.getElementById("gameTable")
let playerA = document.getElementById("player1")
let playerB = document.getElementById("player2")

function changePlayer(){
    if (curPlayer==players[0]){
        curPlayer=players[1]
    }
    else{curPlayer=players[0]}
}


function  winGameScreen(){
    // TODO:
    
}

// TODO: finish!!!!!!!!!!!!!!!!
function isEndOfGame(){
    checkRows = boardArr.map(row=>row.every((square, i, row) => square.state === row[0].state && square.state!= null ))
    // checkCols = boardArr.map()
    // checkDiagon = 
    rowVictory = checkRows.includes(true)
    colVictory = false
    diagonalVictory = false
    // console.log(checkCols)
    // console.log(colVictory)
    console.log(rowVictory || colVictory || diagonalVictory)
    return rowVictory || colVictory || diagonalVictory
    
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
    console.log(boardArr)
    console.log(steps)
    endOfGame = isEndOfGame()
    if (endOfGame){
        // winGameScreen
        alert("woohoo there is a winner!!")
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


function addPlayers(){
    playerAState = states[Math.floor(Math.random() * players.length)]
    players[0].state = playerAState
    playerBState = players[0].state == states[0] ? states[1] : states[0]    
    players[1].state = playerBState
    playerA.innerText = `Player A: ${playerAState}`
    playerB.innerText = `Player B: ${playerBState}`

}

// this function turn on the game by sending to other funcs: build the board array, deal with players, deal with board screen.
function game(){
    initBoardArr()
    addPlayers()
    initBoardScreen()
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
// TODO:
 // add onclick to 6 buttons


function  startGameBtn(){
// TODO:

}
function  saveGameBtn() {
// TODO:

}
function  deleteLastStepBtn(){
// TODO:

} 
function  loadGameBtn(){
// TODO:

}
function  showRecordsBtn(){
// TODO:

}
function  timer(){
// TODO:

}
function  changeDimBtn(){ //change the const dimension{
// TODO:

}


