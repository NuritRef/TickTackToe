let boardArr = []
let rowArr = []
let dimension = 3
let players = ["X","O"]
let curPlayer = players[0]
let isEndGame = false

function initBoard(){
    for ( let i=0;i<dimension;i++){
        for (let j=0;j<dimension;j++){
            rowArr.push({state:null,stepNum:0})
        }
        boardArr.push(rowArr)
        rowArr = []
    }
}

// TODO:
 // add onclick to 6 buttons
function checkPress(event){
    // TODO:
    // fill object 
    // insert image
    // isEndOfGame()
    // no - change player
    // yes - win function

}


// TODO:
function isEndOfGame(){
// TODO:

}
function  winGame(){
// TODO:

}
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


initBoard()

// function runGame(){
//     initBoard()
//     while (!isEndGame){
//         singleTurn(curPlayer,)
//     }

// }
