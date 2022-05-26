let boardArr = []
let rowArr = []
let dimension = 3
let players = [{name:null, scores:0},{name:null, scores:0}]
let states = ["X","O"]
let curPlayer = players[0]
let isEndGame = false
let steps;
let savedGame;
let timer;
let winner;
let winLineIdentifyArr


let timerElem = document.getElementById("timer")
let startScreen = document.getElementById("startScreen")
let btnStart = document.getElementById("btnStart") 
let gameScreen = document.getElementById("gameScreen")
let ScoresScreen =  document.getElementById("ScoresScreen")
let gameTable = document.getElementById("gameTable")
let playersScreen = document.getElementById("players")
let winScreen = document.getElementById("winGameScreen")
let btnCloseRec = document.getElementById("btnCloseRec")
let changeDimention = document.getElementById("changeDimention")
let divPlayers = document.getElementById("players")
//buttons:
let restartBtn = document.getElementById("btnRestart")
let saveBtn = document.getElementById("btnSave")
let loadBtn = document.getElementById("btnLoad")
let deleteStepBtn = document.getElementById("btnDeleteStep")
let showRecordsBtn = document.getElementById("btnShowRecord")
let CloseRecBtn = document.getElementById("btnCloseRec")
let ChangeDimBtn = document.getElementById("btnChangeDim")
let btnSetDim = document.getElementById("btnSetDim")


btnCloseRec.onclick=function(){
    this.parentNode.style.display='none'
}

function  timerF(){
    let totTensSec = 0
    timer = setInterval(function () {
        totTensSec ++
        let minute = Math.floor(totTensSec / 600)
        let second = Math.floor((totTensSec - minute * 600) / 10)
        let tensSecond = totTensSec - (minute * 600 + second * 10)
        timerElem.innerHTML = String(minute).padStart(2,'0') + ":" + String(second).padStart(2,'0') + ":" + String(tensSecond).padStart(2,'0');
      }, 100);
}

function changePlayer(){
    
    if (curPlayer==players[0]){
        curPlayer=players[1]
    }
    else{
        curPlayer=players[0]
    }
    document.getElementById(players[0].name).className="player"
    document.getElementById(players[1].name).className="player"

    document.getElementById(curPlayer.name).className+=" currTurn"

}

function  winGame(){
    let winnerScores

    // ADD SCORES TO WINNER
    players.map(e=>{ 
        if(e.name===winner){
        e.scores+=10
        winnerScores = e.scores
        }
    })

    if(winLineIdentifyArr!=null){
    //BLINK WINLINE
    let inHTML = "<img src='IMG/" + winner + "bold.png' alt='' />"
let w = winLineIdentifyArr[0]
    switch(winLineIdentifyArr[1]){
        case 'R':
            
            for(let i=0;i<dimension;i++){
                document.getElementById(winLineIdentifyArr[0]+"_"+i).innerHTML = inHTML
            }
             break;
        case 'C':
            debugger
            for(let i=0;i<dimension;i++){
                document.getElementById(i+"_"+winLineIdentifyArr[0]).innerHTML = inHTML
            }
            break;
        case 'D':
            if(w=="0"){
                for(let i=0;i<dimension;i++)
                    document.getElementById(i+"_"+i).innerHTML = inHTML
            }
            else{
                for(let i=0;i<dimension;i++)
                    document.getElementById(i+"_"+(2-i)).innerHTML = inHTML
            }
        break;   
    }
    }
    
    //PRINT MESSAGE WINNER+SCORES
    clearInterval(timer)
    setTimeout(function(){
        gameScreen.style.display = "none"
        if (winner == null){
            winScreen.innerHTML = `END OF GAME!! <br/> No winner :(`
        }
        else{
            winScreen.innerHTML = "<div>woohooo!!!<br />and... the winner is: <br /><span class='blinking'>" + winner + "</span></div>"
            winScreen.innerHTML += "GOT "+ winnerScores + " SCORES!!!!!!"
        }
        winScreen.style.display = "flex"
        startScreen.style.display = 'block'
        btnStart.onclick = restartBtn.onclick
        },2000)


}

function isEndOfGame(){
    let isEnd = false
    // rows test
    let checkRows = boardArr.map(row=>row.every((square, i, row) => square.state === row[0].state && square.state!= null ))
    isEnd = checkRows.includes(true)
    if(isEnd){  
        winner = boardArr[checkRows.indexOf(true)][0].state
        winLineIdentifyArr = [checkRows.indexOf(true),'R']
        return true
    }
    
    // collums test
    let cols = boardArr[0].map((e, i) => boardArr.map(row => row[i]));
    let checkCols = cols.map(row=>row.every((square, i, row) => square.state === row[0].state && square.state!= null ))
    isEnd = checkCols.includes(true)
    if(isEnd){
        winner = cols[checkCols.indexOf(true)][0].state
        winLineIdentifyArr = [checkCols.indexOf(true),'C']
        return true
    }
    
    // diagonal1 test
    let diagonal1 = boardArr.map((row,i)=>row[i].state)
    isEnd = diagonal1.every(square => square === diagonal1[0] && square!= null)
    if(isEnd){
        winner = boardArr[0][0].state
        winLineIdentifyArr = [0,'D']
        return true
    }
    
    // diagonal2 test
    let diagonal2 = [...boardArr].reverse().map((row,i)=>row[i].state)
    isEnd = diagonal2.every(square => square === diagonal2[0] && square!= null)
    if(isEnd){
        winner = boardArr[2][0].state
        winLineIdentifyArr = [1,'D']
        return true
    }

    if (steps == (dimension*dimension)){
        isEnd = true
        winner = null
    }
    return isEnd
    
}

let singleTurn = function(e){
    e.target.classList.add("isFlipped")
    e.target.innerHTML = "<img src='IMG/" + curPlayer.name + ".png' alt='' />"
    e.target.onclick = null
    steps ++
    let curLocRow = Number(e.target.id[0])
    let curLocCol = Number(e.target.id[2])
    boardArr[curLocRow][curLocCol].state = curPlayer.name
    boardArr[curLocRow][curLocCol].stepNum = steps
    endOfGame = isEndOfGame()
    if (endOfGame){
        winGame()
    }
    else{changePlayer()} 
    deleteStepBtn.disabled=false
     
}

// this function init the board array according to the dimension
function initBoardArr(){
    boardArr = []
    steps = 0
    winLineIdentifyArr=null
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
    //SET GRID IMG
    gameTable.style.backgroundImage = "url(IMG/grid"+dimension+".PNG)"
    
    //SET GRID SCREEN_ARR
    for (i=0;i<dimension;i++){
        for(j=0;j<dimension;j++){
            let square = document.createElement("div")
            square.className = "square"
            square.classList.add("square"+String(dimension))
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
function initPlayers(){
    players[0].name = 'X'
    players[1].name = 'O'
    curPlayer = players[Math.floor(Math.random() * players.length)]

}


// init players screen
function initPlayersScreen(){
    deleteChildren(playersScreen)

    playerA = document.createElement("div")
    playerA.className ="player" 
    playerA.id = "X"
    playerA.innerHTML = `<span><b>Player ${players[0].name} scores:</b></span><br /><hr />`
    playerA.innerHTML += `<span>${players[0].scores}</span>`
    if(curPlayer.name=="X")
        playerA.className+=" currTurn"

    VS = document.createElement("h1")
    VS.innerHTML = `VS`

    playerB = document.createElement("div")
    playerB.className = "player"
    playerB.id = "O"
    playerB.innerHTML = `<span><b>Player ${players[1].name} scores:</b></span><br /><hr />`
    playerB.innerHTML += `<span>${players[1].scores}</span>`
    if(curPlayer.name=="O")
        playerB.className+=" currTurn"

    playersScreen.append(playerA,VS,playerB)  
}

function deleteChildren(elem) {
    let child = elem.lastElementChild; 
    while (child) {
        elem.removeChild(child);
        child = elem.lastElementChild;
    }
}

// this function turn on the game by sending to other funcs: build the board array, deal with players, deal with board screen.
function game(){
    initBoardArr()
    initBoardScreen()
    initPlayers()
    initPlayersScreen()
    timerF()
    gameScreen.style.display = "flex"
}

// this function is called first, dealls with start screen inputs/buttons and send to start game function when buttons is clicked.
function startGameScreen(){
    gameTable.replaceChildren()//delete children
    btnStart.onclick = function(){
        startScreen.style.display = 'none'
        document.body.style.backgroundImage = 'none'
        game()
    }
}

startGameScreen()


// -----------------------------------------------------------------------------------------
// buttons-

restartBtn.onclick = function(){
    gameTable.replaceChildren()//delete children
    startScreen.style.display = 'none'
    winScreen.style.display = 'none'
    clearInterval(timer)
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
    loadBtn.disabled = false
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
    for (i=0;i<dimension;i++){
        for(j=0;j<dimension;j++){
            if (boardArr[i][j].stepNum == steps && boardArr[i][j].stepNum != 0){
                loc = `${i}_${j}`
                boardArr[i][j].stepNum = 0
                boardArr[i][j].state = null
                changePlayer()
                // update element with step back 
                lastStepElem = document.getElementById(loc)
                lastStepElem.classList.remove("isFlipped")
                lastStepElem.innerText = ""
                lastStepElem.onclick = singleTurn
                steps --
                if (steps == 0){deleteStepBtn.disabled=true}
                return
            }
        }
    }
}


showRecordsBtn.onclick = function(){
    Xrec = document.getElementById("X-rec")
    Orec = document.getElementById("O-rec")
    Xrec.innerText = players[0].scores
    Orec.innerText = players[1].scores

    changeDimention.style.display="none"
    ScoresScreen.style.display="block"

}


ChangeDimBtn.onclick = function(){
    ScoresScreen.style.display="none"
    changeDimention.style.display="block"
}

btnSetDim.onclick = function(){

    dimension = ddlDimention.value
    restartBtn.click()
    changeDimention.style.display="none"

}


CloseRecBtn.onclick=function(){
    this.parentNode.style.display='none'
}


