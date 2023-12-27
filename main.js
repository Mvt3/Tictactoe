const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#restart-btn");

startBtn.addEventListener("click", ()=>{
    Game.start();
});

resetBtn.addEventListener("click", () => {
    Game.reset();
});

//factory function new concept
const createPlayer = (name, mark) =>{
    return {
        name,
        mark
    };
};


const Game = (() =>{
    let players = [];
    let currentPlayerIndex;
    let gameOver = false;

    const start = () =>{
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render()
        

    };
    //target gives us the HTML element that was clicked. Rembember use (event) to see more inf
    const markers = (event) => {
        if(gameOver){
            return
        };

        let index = parseInt(event.target.id.split("-")[1]); //array of two elements, [1] returns the index.
        console.log(index)
        

        if (Gameboard.getGameboard()[index] !== "")
            return;

        Gameboard.update(index, players[currentPlayerIndex].mark);

        if(win(Gameboard.getGameboard(), players[currentPlayerIndex].mark)){
            gameOver = true;
            alert(`${players[currentPlayerIndex].name} won!!!`);
        } else if (tie(Gameboard.getGameboard())){
            gameOver = true;
            alert(`No one won!`);
        };

        //Players turn
        currentPlayerIndex = currentPlayerIndex === 0 ? 1:0;
 
        
        //console.log(event.target.id)
    };

    const reset = () => {
      for(let i = 0;i<9; i++){
        Gameboard.update(i, "")
      }
      gameOver = false;
      currentPlayerIndex = 0;
    };


    return {
        start,
        markers,
        reset,
    }

})();



const Gameboard = (() => {
    //Tablero 3x3
    let gameboard = ["","","",
                     "","","",
                     "","",""];

    const render = () =>{
        let boardShow = "";
        gameboard.forEach((square, index) => {
            boardShow += `<div class="square" id=square-${index}">${square}</div>`
        });

        document.querySelector("#gameboard").innerHTML = boardShow;
        const squares = document.querySelectorAll(".square");
        //console.log(squares); necesario All, si no, solo selecciona el primero.
        squares.forEach((square) => {
            square.addEventListener('click', Game.markers);
            
        });
        
        
    };

    const update = (index, value) =>{
        gameboard[index] = value;
        render();
    };

    const getGameboard = () => gameboard;

    
    return {
        render,
        update,
        getGameboard,
    }
})();



//Who win?
const win = (board) =>{
    const allCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < allCombinations.length; i++) {
        const [a,b,c] = allCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        }   
    }
    return false;
};

//Tie?
const tie = (board) => {
    
    return board.every(element => element !== "")
};