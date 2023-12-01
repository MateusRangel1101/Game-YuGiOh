const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points')
    },
    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },
    playerSides: {
        player1: 'player-cards',
        player1Box: document.querySelector('#player-cards'),
        computer: 'computer-cards',
        computerBox: document.querySelector('#computer-cards'),
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    actions: {
        button: document.getElementById('next-duel')
    },
}

const pathImages = './src/assets/icons/'
const cardData = [
    {
        id: 0,
        name: 'Blue Eyes White Dragon',
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winfOf: [1],
        loseOf: [2],
    },
    {
        id: 1,
        name: 'Dark Magician',
        type: "Rock",
        img: `${pathImages}magician.png`,
        winfOf: [2],
        loseOf: [0],
    },
    {
        id: 2,
        name: 'Exodia',
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winfOf: [0],
        loseOf: [1],
    }
]

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomId()
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        document.getElementById(fieldSide).appendChild(cardImage)
    }
}

function getRandomId() {
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id
}

function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement('img')
    cardImage.setAttribute('height', '100px')
    cardImage.setAttribute('src', './src/assets/icons/card-back.png')
    cardImage.setAttribute('data-id', idCard)
    cardImage.classList.add('card')

    if (fieldSide === state.playerSides.player1) {
        cardImage.addEventListener('click', () => {
            setCardField(cardImage.getAttribute('data-id'))
        })
    }

    cardImage.addEventListener('mouseover', () => {
        drawSelectedCard(idCard)
    })

    return cardImage
}

async function drawSelectedCard(index) {
    state.cardSprites.avatar.src = cardData[index].img
    state.cardSprites.name.innerText = cardData[index].name
    state.cardSprites.type.innerText = 'Attribute: ' + cardData[index].type

}

async function setCardField(cardId) {
    await removeAllCardsImage()
    let computerCardId = await getRandomId()
    state.fieldCards.player.style.display = 'block'
    state.fieldCards.computer.style.display = 'block'

    state.fieldCards.player.src = cardData[cardId].img
    state.fieldCards.computer.src = cardData[computerCardId].img

    let duelResults = await checkDuelResults(cardId, computerCardId)

    await updateScore()
    await drawButton(duelResults)
}

async function removeAllCardsImage() {
    let cards = state.playerSides.player1Box
    let imgElements = cards.querySelectorAll('img')
    imgElements.forEach((img) => img.remove())

    cards = state.playerSides.computerBox
    imgElements = cards.querySelectorAll('img')
    imgElements.forEach((img) => img.remove())
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = 'Empate'
    let playerCard = cardData[playerCardId]

    if (playerCard.winfOf.includes((computerCardId))) {
        duelResults = 'Ganhou'
        state.score.playerScore++
    } else if (playerCard.loseOf.includes((computerCardId))) {
        duelResults = 'Perdeu'
        state.score.computerScore++
    }

    return duelResults
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`
}

async function drawButton(text) {
    state.actions.button.innerText = text
    state.actions.button.style.display = 'block'

}

function init() {
    drawCards(5, state.playerSides.player1)
    drawCards(5, state.playerSides.computer)
}

init()