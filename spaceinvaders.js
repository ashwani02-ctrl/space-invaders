const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 700;

const Player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 20,
    speed: 6
};

const keys = {};
document.addEventListener("keydown", e =>{
    keys[e.key] = true;
})


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lime";
    ctx.fillRect(Player.x, Player.y, Player.width, Player.height);
}

function gameLoop(){
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
