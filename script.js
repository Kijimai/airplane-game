console.log("Connected!")

const playerPosition = {
  left: 450,
  top: 620,
}

const enemies = [
  {
    left: 350,
    top: 200,
  },
  {
    left: 450,
    top: 250,
  },
  {
    left: 150,
    top: 200,
  },
  {
    left: 250,
    top: 250,
  },
  {
    left: 550,
    top: 200,
  },
  {
    left: 650,
    top: 250,
  },
  {
    left: 750,
    top: 200,
  },
]

const missiles = []

const ultrosPosition = {
  left: 300,
  top: 100,
}

// const player = document.getElementById("player")
// const enemy = document.getElementById("enemy")

function drawEnemies() {
  let content = ""

  for (let i = 0; i < enemies.length; i++) {
    content += `<div class="enemy" style="left: ${enemies[i].left}px; top: ${enemies[i].top}px"></div>`
  }
  document.getElementById("enemies").innerHTML = content
}

function drawPlayer() {
  let content = ""
  content = `<div class="player" style="left: ${playerPosition.left}px; top: ${playerPosition.top}px"></div>`

  document.getElementById("players").innerHTML = content
}

function drawUltros() {
  let content = ""
  content += `<div class="ultros" style="left: ${ultrosPosition.left}px; top: ${ultrosPosition.top}px"></div>`
  document.getElementById("boss").innerHTML = content
}

document.onkeydown = function (e) {
  switch (e.key) {
    case "ArrowLeft":
      playerPosition.left = playerPosition.left - 10
      if (playerPosition.left < 0) {
        playerPosition.left = 0
      }
      break
    case "ArrowRight":
      playerPosition.left = playerPosition.left + 10
      if (playerPosition.left > window.innerWidth - 40) {
        playerPosition.left = window.innerWidth - 80
      }
      break
    case "ArrowUp":
      playerPosition.top = playerPosition.top - 10
      if (playerPosition.top < 600) {
        playerPosition.top = 600
      }
      break
    case "ArrowDown":
      playerPosition.top = playerPosition.top + 10
      if (playerPosition.top > window.innerHeight - 100) {
        playerPosition.top = window.innerHeight - 100
      }
      break
    case "d":
      shootMissile()
      break
    default:
      break
  }
  drawPlayer()
}

//create a missile and add it into the missiles array
function shootMissile() {
  let missileObject = {
    left: playerPosition.left,
    top: playerPosition.top,
  }
  missiles.push(missileObject)
}

//render missiles into
function drawMissiles() {
  let output = ""
  for (let i = 0; i < missiles.length; i++) {
    output += `<div class="missile" style="left: ${
      missiles[i].left + 35
    }px; top: ${missiles[i].top}px"></div>`
  }
  document.getElementById("missiles").innerHTML = output
}

function updateMissiles() {
  for (let i = 0; i < missiles.length; i++) {
    missiles[i].top = missiles[i].top - 30

    if (missiles[i].top < 0) {
      missiles.splice(i, 1)
    }
  }
}

function updateEnemyPosition() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].top = enemies[i].top + 10

    //remove the specific enemy plane once it reaches beyond the bottom of the browser window
    if (enemies[i].top > window.innerHeight + 20) {
      enemies.splice(i, 1)
    }
  }
}

function missileLoop() {
  // console.log("missile loop is running!")
  updateMissiles()
  drawMissiles()
  setTimeout(missileLoop, 50)
}

function gameLoop() {
  // console.log("Game Loop is running!")
  updateEnemyPosition()
  drawEnemies()
  drawUltros()

  //recursive calling of function every quarter second
  setTimeout(gameLoop, 250)
}

//Enemies begin to move after 2 seconds
setTimeout(gameLoop, 2000)

missileLoop()
drawPlayer()
drawEnemies()
drawUltros()
