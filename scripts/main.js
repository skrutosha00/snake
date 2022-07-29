import { setBalanceField } from "./functions.js";

if (!localStorage.getItem('balance_snake')) {
    localStorage.setItem('balance_snake', 100)
}

if (!localStorage.getItem('levels_snake')) {
    localStorage.setItem('levels_snake', [1])
}

if (!localStorage.getItem('1_snake')) {
    localStorage.setItem('1_snake', 1)
}

if (!localStorage.getItem('chosen_snake')) {
    localStorage.setItem('chosen_snake', 1)
}

if (!localStorage.getItem('fruit_snake')) {
    localStorage.setItem('fruit_snake', 0)
}

if (!localStorage.getItem('rewards_snake')) {
    localStorage.setItem('rewards_snake', [])
}

setBalanceField()

document.querySelector('.wrapper').style.background = 'url(../png/back_' + localStorage.getItem('chosen_snake') + '.png) center/100% 100%'

for (let i = 0; i < 6; i++) {
    let levels = Array.from(localStorage.getItem('levels_snake').split(','), el => Number(el))

    let level = document.createElement('a')
    level.classList.add('level', 'block')
    level.innerHTML = i + 1

    if (!(levels.includes(i + 1))) {
        level.classList.add('disabled')
    } else {
        level.href = './game.html'

        level.onclick = () => {
            localStorage.setItem('level_snake', i + 1)
        }
    }

    document.querySelector('.level_cont').append(level)
}

window.onload = () => {
    document.querySelector('.wrapper').classList.remove('hidden')
}