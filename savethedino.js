//canvas setup
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
//***** */ let gameFrame = 0;
//***** */ context.font = "50px Georgia";

const asteroids = [];
const dinosaur = [];
let left;
let right;

//create one asteroid
class enemy {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "blue";
    this.yVelocity = 6;
    //link to sprite** this.image = document.getElementById();
  }

  draw() {
    context.strokeRect(this.x, this.y, this.width, 30);
    context.strokeStyle = "black";
    context.beginPath();
    context.rect(this.x, this.y, this.width, 30);
    context.fillStyle = this.color;
    context.fill();
    //** context.drawImage(this.image, 0,0)
  }

  update() {
    this.draw();
    this.y += this.yVelocity;
  }
}

//create dinosaur
class player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 10;
  }

  draw() {
    context.strokeRect(this.x, this.y, this.width, this.height);
    context.strokeStyle = "solid black";
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  update(asteroids) {
    this.draw();
    if (right) this.x += this.speed;
    if (left) this.x -= this.speed;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }
    asteroids.forEach(enemy) => {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const distance = Math.sqrt(dx*dy+dx*dy);
      if (distance < enemy.width/2) };
  }
}

dinosaur.push(new player(canvas.width / 2, canvas.height - 50, 30, 100));

//keyboard interactivity
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    left = true;
  }

  if (event.key == "ArrowRight") {
    right = true;
  }
});

document.addEventListener("keyup", () => {
  left = false;
  right = false;
});

// new asteroids added

setInterval(() => {
  const x = Math.random() * canvas.width;
  asteroids.push(new enemy(x, -10, 27));
}, 2500);

//collision detection
if (
  asteroids.x < dinosaur.x + dinosaur.width &&
  asteroids.x + asteroids.width > dinosaur.x &&
  asteroids.y < dinosaur.y + dinosaur.height &&
  asteroids.y + asteroids.height > dinosaur.y
) {
  console.log("true");
}

//animation loop
const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  asteroids.forEach((ball) => {
    ball.update();
  });

  dinosaur.forEach((player) => {
    player.update(asteroids);

    requestAnimationFrame(animate);
  });
};

animate();
