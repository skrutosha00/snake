import { changeBalance, setBalanceField } from "./functions.js"

setBalanceField()

let rewards = Array.from(localStorage.getItem('rewards_snake').split(','), el => Number(el))
let levels = Array.from(localStorage.getItem('levels_snake').split(','), el => Number(el))

document.querySelector('.wrapper').style.background = 'url(../png/back_' + localStorage.getItem('chosen_snake') + '.png) center/100% 100%'

for (let i = 0; i < 3; i++) {
    let goals = [15, 50, 100]
    let fruitAmount = Number(localStorage.getItem('fruit_snake'))
    let button = document.querySelectorAll('.button')[i]

    if (fruitAmount >= goals[i] && !(rewards.includes(i + 1))) {
        button.classList.add('pick_up')
        button.innerHTML = 'Pick up'

        button.onclick = () => {
            button.classList.replace('pick_up', 'did_it')
            button.innerHTML = 'Did it'

            rewards.push(i + 1)
            localStorage.setItem('rewards_snake', rewards)

            changeBalance(Number(button.dataset.value))
        }
    } else if (fruitAmount >= goals[i] && rewards.includes(i + 1)) {
        button.innerHTML = 'Did it'
        button.classList.add('did_it')
    }
}

for (let i = 3; i < 5; i++) {
    let goals = [4, 6]
    let button = document.querySelectorAll('.button')[i]

    if (goals[i - 3] <= levels.length && !(rewards.includes(i + 1))) {
        button.classList.add('pick_up')
        button.innerHTML = 'Pick up'

        button.onclick = () => {
            button.classList.replace('pick_up', 'did_it')
            button.innerHTML = 'Did it'

            rewards.push(i + 1)
            localStorage.setItem('rewards_snake', rewards)

            changeBalance(Number(button.dataset.value))
        }
    } else if (goals[i - 3] >= levels.length && rewards.includes(i + 1)) {
        button.innerHTML = 'Did it'
        button.classList.add('did_it')
    }
}

window.onload = () => {
    document.querySelector('.wrapper').classList.remove('hidden')
}