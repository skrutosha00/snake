import { setBalanceField, changeBalance, animateOnce } from "./functions.js"

let items = [
    { name: "1", price: 0 },
    { name: "2", price: 150 },
    { name: "3", price: 250 }
]

setBalanceField()
let balance = document.querySelector('.balance')
let cardCont = document.querySelector('.shop')

document.querySelector('.wrapper').style.background = 'url(../png/back_' + localStorage.getItem('chosen_snake') + '.png) center/100% 100%'

for (let item of items) {

    if (!localStorage.getItem(item.name + '_snake')) {
        localStorage.setItem(item.name + '_snake', 0)
    }

    let card = document.createElement('div')
    card.classList.add('card')

    let picCont = document.createElement('div')
    picCont.classList.add('pic_cont', 'block')
    card.appendChild(picCont)

    let pic = document.createElement('img')
    pic.src = '../png/shop_' + item.name + '.png'
    picCont.appendChild(pic)

    let button = document.createElement('div')
    button.classList.add('button', 'block')
    button.innerHTML = item.price
    button.dataset.item = item.name

    if (localStorage.getItem(item.name + '_snake') == 1) {
        button.innerHTML = 'Select'
    }

    if (localStorage.getItem('chosen_snake') == item.name) {
        button.innerHTML = 'Selected'
    }

    card.appendChild(button)

    button.onclick = () => {
        let price = item.price

        if (localStorage.getItem(button.dataset.item + '_snake') == 1) {
            localStorage.setItem('chosen_snake', button.dataset.item)

            for (let b of document.querySelectorAll('.button')) {
                if (b.innerHTML == 'Selected') {
                    b.innerHTML = 'Select'
                }
            }

            document.querySelector('.wrapper').style.background = 'url(../png/back_' + localStorage.getItem('chosen_snake') + '.png) center/100% 100%'
            button.innerHTML = 'Selected'
        }

        if (button.innerHTML == price) {
            if (Number(balance.innerHTML) <= price) { return }

            button.innerHTML = 'Select'
            changeBalance(-price)

            localStorage.setItem(button.dataset.item + '_snake', 1)
            localStorage.setItem('chosen_snake', button.dataset.item)
        }
    }

    cardCont.appendChild(card)
}

window.onload = () => {
    document.querySelector('.wrapper').classList.remove('hidden')
}