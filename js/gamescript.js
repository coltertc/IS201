const spaceship = document.getElementById("spaceship");
const gameContainer = document.querySelector(".game-container");
let score = 0;

// Spaceship movement
document.addEventListener("keydown", (e) => {
  const left = spaceship.offsetLeft;
  if (e.key === "ArrowLeft" && left > 10) {
    spaceship.style.left = left - 20 + "px";
  } else if (e.key === "ArrowRight" && left < gameContainer.offsetWidth - 60) {
    spaceship.style.left = left + 20 + "px";
  } else if (e.key === " ") {
    shootLaser();
  }
});

// Shoot lasers
function shootLaser() {
  const laser = document.createElement("div");
  laser.classList.add("laser");
  laser.style.left = spaceship.offsetLeft + 22 + "px";
  laser.style.bottom = "60px";
  gameContainer.appendChild(laser);

  const laserInterval = setInterval(() => {
    const lasers = document.querySelectorAll(".laser");
    lasers.forEach((laser) => {
      const laserBottom = parseInt(laser.style.bottom.replace("px", ""));
      if (laserBottom > gameContainer.offsetHeight) {
        laser.remove();
      } else {
        laser.style.bottom = laserBottom + 10 + "px";
        checkLaserHit(laser);
      }
    });
  }, 30);
}

// Spawn asteroids
function spawnAsteroid() {
  const asteroid = document.createElement("div");
  asteroid.classList.add("asteroid");
  asteroid.style.left = Math.random() * (gameContainer.offsetWidth - 40) + "px";
  asteroid.style.top = "0px";
  gameContainer.appendChild(asteroid);

  const asteroidInterval = setInterval(() => {
    const asteroidTop = parseInt(asteroid.style.top.replace("px", ""));
    if (asteroidTop > gameContainer.offsetHeight) {
      asteroid.remove();
      clearInterval(asteroidInterval);
    } else {
      asteroid.style.top = asteroidTop + 5 + "px";
      checkCollision(asteroid, asteroidInterval);
    }
  }, 50);
}

// Check for laser hits
function checkLaserHit(laser) {
  const asteroids = document.querySelectorAll(".asteroid");
  asteroids.forEach((asteroid) => {
    const laserRect = laser.getBoundingClientRect();
    const asteroidRect = asteroid.getBoundingClientRect();

    if (
      laserRect.left < asteroidRect.right &&
      laserRect.right > asteroidRect.left &&
      laserRect.top < asteroidRect.bottom &&
      laserRect.bottom > asteroidRect.top
    ) {
      laser.remove();
      asteroid.remove();
      score += 10;
      console.log("Score:", score);
    }
  });
}

// Check for collisions
function checkCollision(asteroid, interval) {
  const spaceshipRect = spaceship.getBoundingClientRect();
  const asteroidRect = asteroid.getBoundingClientRect();

  if (
    asteroidRect.left < spaceshipRect.right &&
    asteroidRect.right > spaceshipRect.left &&
    asteroidRect.top < spaceshipRect.bottom &&
    asteroidRect.bottom > spaceshipRect.top
  ) {
    clearInterval(interval);
    asteroid.remove();
    alert("Game Over! Your score: " + score);
    location.reload();
  }
}

// Game loop
setInterval(spawnAsteroid, 1000);
