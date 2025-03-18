document.addEventListener('DOMContentLoaded',()=>{

    const gameArena = document.getElementById('game-arena');
    const areanSize =600;
    const cellSize = 20;
    let score =0;
    let gameStarted = false;
    let food = {x:400 , y:300};
    let snake = [{x:380,y:200},{x:360,y:200},{x:340,y:200}];
    let dx=cellSize;
    let dy=0;
    let snakeColor = ['#008000','#198c19','#329932','#4ca64c','#66b266','#7fbf7f','#99cc99','#b2d8b2' , '#cce5cc','#e5f2e5'];

    function drawScoreBoard(){
        const scoreBoard=document.getElementById('score-board');
        scoreBoard.textContent=`Score: ${score}`;
    }

    function drawDiv(x,y,className){
        const div = document.createElement('div');
        div.style.position='absolute';
        div.classList.add(className);
        div.style.top=`${y}px`;
        div.style.left=`${x}px`;
        return div;
    }

    function drawFoodAndSnake(){
        gameArena.innerHTML='';
        const foodElement = drawDiv(food.x ,food.y,'food');
        gameArena.appendChild(foodElement);

        snake.forEach((snakeCell,idx)=>{
            const element  = drawDiv(snakeCell.x,snakeCell.y,'snake');
            let x =snake.length;
            element.style.backgroundColor=snakeColor[idx%x];
            gameArena.appendChild(element);
        })
    }

    function gameLoop(){
        setInterval(() => {
            drawScoreBoard();
            drawFoodAndSnake();
        }, 1000);
    }

    function runGame(){
        gameStarted=true;

        gameLoop();
    }

    function initiateGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id ='score-board';
        
        document.body.insertBefore(scoreBoard,gameArena);

        const startButton = document.createElement('button');
        startButton.textContent='Start Game';
        startButton.classList.add('start-button'); 
        document.body.appendChild(startButton);

        startButton.addEventListener('click',()=>{
            startButton.style.display='none';
            runGame();
        })
    }


    initiateGame();

})