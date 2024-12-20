const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;
const unit = 15;

let snake = [
    { x: 3 * unit, y: 3 * unit }
];
let food = generateFood();
let direction = 'right';
let gameLoop;
let score = 0;
const scoreDisplay = document.getElementById('scoreDisplay');

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / unit)) * unit,
        y: Math.floor(Math.random() * (canvas.height / unit)) * unit
    };
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#0f0';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, unit, unit);
    });

    // Draw food
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x, food.y, unit, unit);
}

function move() {
    const head = { ...snake[0] };

    switch(direction) {
        case 'up': head.y -= unit; break;
        case 'down': head.y += unit; break;
        case 'left': head.x -= unit; break;
        case 'right': head.x += unit; break;
    }

    // Check collision with walls
    if (head.x < 0 || head.x >= canvas.width || 
        head.y < 0 || head.y >= canvas.height) {
        gameOver();
        return;
    }

    // Check collision with self
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        score++;
        updateScore();
    } else {
        snake.pop();
    }
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function gameOver() {
    clearInterval(gameLoop);
    alert(`Game Over! Score: ${score}`);
    snake = [{ x: 3 * unit, y: 3 * unit }];
    direction = 'right';
    score = 0;
    updateScore();
    food = generateFood();
    gameLoop = setInterval(gameStep, 100);
}

function gameStep() {
    move();
    draw();
}

// Controls
document.getElementById('upBtn').onclick = () => direction = 'up';
document.getElementById('downBtn').onclick = () => direction = 'down';
document.getElementById('leftBtn').onclick = () => direction = 'left';
document.getElementById('rightBtn').onclick = () => direction = 'right';

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp': direction = 'up'; break;
        case 'ArrowDown': direction = 'down'; break;
        case 'ArrowLeft': direction = 'left'; break;
        case 'ArrowRight': direction = 'right'; break;
    }
});

// Start game
gameLoop = setInterval(gameStep, 100);
