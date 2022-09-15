// canvas setup
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

const asteroids = [];
const largeAsteroids = [];
const dinosaur = [];
let left;
let right;

// create background
class background {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById("backgroundImage");
    this.x = 0;
    this.y = 0;
    this.width = 800;
    this.height = 500;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}

const backgroundImage = new background(canvas.width, canvas.height);

// create one asteroid
class enemy {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yVelocity = 5;
    this.image = document.getElementById("asteroidImage");
  }

  draw() {
    context.beginPath();
    context.rect(this.x, this.y, this.width, 50);
    context.drawImage(this.image, this.x, this.y, 40, 80);
  }

  update() {
    this.draw();
    this.y += this.yVelocity;
  }
}

class newEnemy {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yVelocity = Math.floor(Math.random() * 8) + 5;
    this.image = document.getElementById("largeAsteroidImage");
  }

  draw() {
    context.beginPath();
    context.rect(this.x, this.y, this.width, 50);
    context.drawImage(this.image, this.x, this.y, 40, 80);
  }

  update() {
    this.draw();
    this.y += this.yVelocity;
  }
}

// create dinosaur
class player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
    this.image = document.getElementById("dinosaurImage");
  }

  draw() {
    context.drawImage(this.image, this.x, this.y, 120, 120);
  }

  update() {
    this.draw();
    if (right) this.x += this.speed;
    if (left) this.x -= this.speed;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }
  }
}

dinosaur.push(new player(canvas.width / 2, canvas.height - 100, 80, 120));

// keyboard interactivity
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

// asteroid creation
const asteroidCreation = () => {
  const x = Math.random() * canvas.width;
  asteroids.push(new enemy(x, -20, 30, 30));
};

setInterval(asteroidCreation, 800);

//asteroid removal
const asteroidRemoval = () => {
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i].y > 500) {
      asteroids.splice(0, 1);
    }
  }
};

// collision detection
const checkCollision = () => {
  if (asteroids.length) {
    if (
      asteroids[0].x > dinosaur[0].x + dinosaur[0].width ||
      asteroids[0].x + asteroids[0].width < dinosaur[0].x ||
      asteroids[0].height + asteroids[0].y < dinosaur[0].y
    ) {
    } else {
      console.log("hit");
      // alert("Game Over. Dinosaur Extinct");
    }
  }
};

setInterval(() => {
  asteroidRemoval();
  checkCollision();
}, 500);

// large asteroid

const createLargeAsteroid = () => {
  const x = Math.random() * canvas.width;
  largeAsteroids.push(new newEnemy(x, -20, 30, 30));
};

setInterval(createLargeAsteroid, 5500);

//large asteroid removal
const largeAsteroidRemoval = () => {
  for (let i = 0; i < largeAsteroids.length; i++) {
    if (largeAsteroids[i].y > 500) {
      largeAsteroids.splice(0, 1);
    }
  }
};

// collision detection
const checkLargeAsteroidCollision = () => {
  if (largeAsteroids.length) {
    if (
      largeAsteroids[0].x > dinosaur[0].x + dinosaur[0].width ||
      largeAsteroids[0].x + largeAsteroids[0].width < dinosaur[0].x ||
      largeAsteroids[0].height + largeAsteroids[0].y < dinosaur[0].y
    ) {
    } else {
      console.log("hit");
      // alert("Game Over. Dinosaur Extinct");
    }
  }
};

setInterval(() => {
  largeAsteroidRemoval();
  checkLargeAsteroidCollision();
}, 300);

//animation loop
const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw(context);

  asteroids.forEach((asteroid) => {
    asteroid.update();
  });

  largeAsteroids.forEach((asteroid) => {
    asteroid.update();
  });

  dinosaur.forEach((player) => {
    player.update();
  });

  requestAnimationFrame(animate);
};
animate();
