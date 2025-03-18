document.addEventListener('DOMContentLoaded',()=>{

    const gameArena = document.getElementById('game-arena');
    const areanSize =600;
    const cellSize = 20;
    let score =0;
    let gameStarted = false;
    let food = {x:200 , y:300};
    let snake = [{x:380,y:200},{x:360,y:200},{x:340,y:200}];
    let dx=cellSize;
    let dy=0;


    function startGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id ='score-board';
        
        document.body.insertBefore(scoreBoard,gameArena);

        const startButton = document.createElement('button');
        startButton.textContent='Start Game';
        startButton.classList.add('start-button'); 
        document.body.appendChild(startButton);
    }


    startGame();

})