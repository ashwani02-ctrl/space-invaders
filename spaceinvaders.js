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
let bullets = [];
document.addEventListener("keydown", e =>{
    keys[e.key] = true;
    if(e.key === " "){
        bullets.push({
            x: Player.x + Player.width / 2 - 3,
            y: Player.y,
            width: 6,
            height: 10,
            speed: 7
        })
    }
})

document.addEventListener("keyup", e =>{
    keys[e.key] = false;
});

let enemies = [];
const rows = 4;
const cols = 8;

for(let r = 0; r < rows; r++){
    for(let c = 0; c < cols; c++){
        enemies.push({
            x: 100 + c * 70,
            y: 50 + r * 50,
            width: 40,
            height: 30,
            alive: true
        });
    }
}

function update(){
    if(keys["ArrowLeft"] && Player.x > 0) {
        Player.x -= Player.speed;
    }

    if(keys["ArrowRight"] && Player.x < canvas.width - Player.width){
        Player.x += Player.speed;
    }

    bullets.forEach((bullet, index)=>{
        bullet.y -= bullet.speed;

        if(bullet.y < 0){
            bullets.splice(index, 1);
        }
    })

    bullets.forEach((bullet, bIndex) =>{
        enemies.forEach((enemy) =>{
            if(enemy.alive &&
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x && 
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ){
                enemy.alive = false;
                bullets.splice(bIndex, 1);
            }
        })
    })
}


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lime";
    ctx.fillRect(Player.x, Player.y, Player.width, Player.height);

    ctx.fillStyle = "white";
    bullets.forEach(bullet =>{
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
    });

    ctx.fillStyle = "red";
    enemies.forEach(enemy =>{
        if(enemy.alive)
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
    })
}

function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
