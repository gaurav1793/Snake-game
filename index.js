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
            newX = Math.floor(Math.random()*((areanSize-cellSize)/cellSize))*cellSize;
            newY = Math.floor(Math.random()*((areanSize-cellSize)/cellSize))*cellSize;
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

    function isGameOver(){
        //snake hit his body
        for(i=1; i<snake.length ; i++){
            if(snake[0].x=== snake[i].x && snake[0].y === snake[i].y){
                return true;
            }
        }

        //snake hit wall
        const lw =snake[0].x<0;
        const tw = snake[0].y<0;
        const rw = snake[0].x>=areanSize;
        const dw = snake[0].y>=areanSize;

        return lw||tw||rw||dw;

    }

    function gameLoop(){
        setInterval(() => {
            if(!gameStarted)return;
            if(isGameOver()){
                gameStarted=false;

                const over = drawDiv(200,200,'game-finish');
                over.textContent='GAME-OVER'
                gameArena.appendChild(over);

                const restart = document.createElement('button');
                restart.textContent='Restart';
                restart.id='restart';
                restart.className='start-button';

                document.body.insertBefore(restart,gameArena);
                restart.addEventListener('click',()=>{
                    window.location.reload();
                })
                return;
            }
            updateSnake();
            drawScoreBoard();
            drawFoodAndSnake();
        }, 100);
    }

    function changeDirection(e){
        const lk=37;
        const uk=38;
        const rk=39;
        const dk=40;

        const keyPressed = e.keyCode;

        const isup= dy==-cellSize;
        const isdn = dy==cellSize;
        const islt = dx==-cellSize;
        const isrt = dx==cellSize;

        if(keyPressed == lk && !isrt){
            dx=-cellSize;
            dy=0;
        }
        if(keyPressed == uk && !isdn){
            dx=0;
            dy=-cellSize;
        }
        if(keyPressed == rk && !islt){
            dx=cellSize;
            dy=0;
        }
        if(keyPressed == dk && !isup){
            dx=0;
            dy=cellSize;
        }
    }

    function runGame(){
        if(!gameStarted){
            gameStarted=true;
            gameLoop();
            document.addEventListener('keydown',changeDirection);
        }
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