document.addEventListener('DOMContentLoaded',()=>{

    const gameArena = document.getElementById('game-arena');
    const areanSize =600;
    const cellSize = 20;
    let score =0;
    let gameStarted = false;
    let food = {x:400 , y:200};
    let snake = [{x:280,y:200},{x:260,y:200},{x:240,y:200}];
    let dx=cellSize;
    let dy=0;
    let snakeColor = ['#008000','#198c19','#329932','#4ca64c','#66b266','#4ca64c','#329932','#198c19','#008000' ];

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
            let x =snakeColor.length;
            let i=idx%x;
            element.style.backgroundColor=snakeColor[i];
            gameArena.appendChild(element);
        })
    }

    function moveFood(){
        let newX,newY;
        do {
            newX = Math.floor(Math.random()*(((areanSize-cellSize)/cellSize)*cellSize));
            newY = Math.floor(Math.random()*(((areanSize-cellSize)/cellSize)*cellSize));
        } while (snake.some(snakeCell=>snakeCell.x===newX && snakeCell.y===newY));

        food={x:newX,y:newY};
    }

    function updateSnake(){
        let newHead = {x:snake[0].x+dx , y:snake[0].y+dy};
        snake.unshift(newHead);
        if(food.x==newHead.x && food.y==newHead.y){
            //increase score
            score+=5;
            moveFood();
            //no need to pop tail
        }else{
            snake.pop();
        }
        
    }
    function gameLoop(){
        setInterval(() => {
            updateSnake();
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