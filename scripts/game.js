import { changeBalance, randInt, setBalanceField, shuffle } from "./functions.js";

setBalanceField()
let balance = document.querySelector('.balance')
let gameOverTab = document.querySelector('.game_over')

let level = Number(localStorage.getItem('level_snake') ?? 1)

let rowAmount = 8
let colAmount = 13

let dir = 'right'
let snakeCoords = [
    [2, 5], [2, 4], [2, 3], [2, 2]
]
let score = 0
let goal = 5 + (level - 1) * 2

generateField()
let cells = document.querySelectorAll('.cell')

setProgress()
drawSnake()
document.querySelector('.level').innerHTML = 'Level ' + level
document.querySelector('.wrapper').style.background = 'url(../png/back_' + localStorage.getItem('chosen_snake') + '.png) center/100% 100%'

for (let i = 0; i < 5; i++) {
    generateItem('currency')
    generateItem('food_' + level)
}

game()

for (let dirName of ['right', 'left', 'up', 'down']) {
    document.querySelector('.arrow.' + dirName).onclick = () => {
        dir = dirName
    }
}

function generateField() {
    for (let i = 0; i < colAmount * rowAmount; i++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        document.querySelector('.field').append(cell)
    }
}

function setProgress() {
    let img = document.createElement('img')
    img.src = '../png/food_' + level + '.png'

    let progress = document.createElement('div')
    progress.classList.add('progress')
    progress.innerHTML = '0/' + goal

    document.querySelector('.progress_cont').append(img, progress)
}

function updateProgress() {
    document.querySelector('.progress').innerHTML = score + '/' + goal
}

function drawSnake() {
    for (let cell of cells) {
        cell.classList.remove('snake')
    }

    for (let snakeCoord of snakeCoords) {
        cells[transformCoord(snakeCoord)].classList.add('snake')
    }
}

function moveSnake(dir) {
    for (let i = snakeCoords.length - 1; i > 0; i--) {
        snakeCoords[i] = [...snakeCoords[i - 1]]
    }

    if (dir == 'right') {
        snakeCoords[0][1]++
    } else if (dir == 'left') {
        snakeCoords[0][1]--
    } else if (dir == 'up') {
        snakeCoords[0][0]--
    } else if (dir == 'down') {
        snakeCoords[0][0]++
    }
}

function checkValidMove() {
    for (let i = 1; i < snakeCoords.length; i++) {
        if (snakeCoords[0][0] == snakeCoords[i][0] && snakeCoords[0][1] == snakeCoords[i][1]) {
            return false
        }
    }

    if (snakeCoords[0][0] < 0 || snakeCoords[0][0] >= rowAmount || snakeCoords[0][1] < 0 || snakeCoords[0][1] >= colAmount) {
        return false
    }

    return true
}

function generateItem(type) {
    for (let i of shuffle(Array.from({ length: colAmount * rowAmount }, (v, i) => i))) {
        if (cells[i].classList.contains('snake') || cells[i].classList.contains('currency') || cells[i].classList.contains('food_' + level)) {
            continue
        }

        cells[i].classList.add(type)
        return
    }
}

function collectItem() {
    let headCell = cells[transformCoord(snakeCoords[0])]

    if (headCell.classList.contains('currency')) {
        changeBalance(1)
        generateItem('currency')

        headCell.classList.remove('currency')
    } else if (headCell.classList.contains('food_' + level)) {
        score++
        updateProgress()
        generateItem('food_' + level)

        if (snakeCoords.length < 10) {
            let tail = [...snakeCoords[snakeCoords.length - 1]]
            snakeCoords.push(tail)
        }

        headCell.classList.remove('food_' + level)
    }
}

function game() {
    let gameInterval = setInterval(() => {
        moveSnake(dir)
        if (checkValidMove()) {
            collectItem()
            drawSnake()

            if (score == goal) {
                clearInterval(gameInterval)
                gameOver(true)
            }
        } else {
            clearInterval(gameInterval)
            gameOver(false)
        }
    }, 500);
}

function transformCoord(coords) {
    return coords[0] * colAmount + coords[1]
}

function gameOver(result) {
    if (result) {
        let winDiv = document.createElement('div')
        winDiv.classList.add('win_div')

        let winDivText = document.createElement('div')
        winDivText.classList.add('win_div_text')
        winDivText.innerHTML = 'Win'

        winDiv.append(winDivText)
        gameOverTab.append(winDiv)

        if (level != 6) {
            let levels = Array.from(localStorage.getItem('levels_snake').split(','), el => Number(el))
            levels.push(level + 1)
            localStorage.setItem('levels_snake', levels)
            localStorage.setItem('level_snake', level + 1)
        }

        gameOverTab.querySelector('.outcome').innerHTML = 'Level ' + level + ' is complited!'
        gameOverTab.querySelector('.link').innerHTML = 'Next'
    } else {
        gameOverTab.querySelector('.outcome').innerHTML = 'Try again right now!'
        gameOverTab.querySelector('.link').innerHTML = 'Again'
    }

    gameOverTab.style.left = '50%'

    localStorage.setItem('fruit_snake', Number(localStorage.getItem('fruit_snake')) + score)
}

window.onload = () => {
    document.querySelector('.wrapper').classList.remove('hidden')
}