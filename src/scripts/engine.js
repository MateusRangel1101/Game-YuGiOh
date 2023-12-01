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
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    actions: {
        button: document.getElementById('next-duel')
    },
}
const playerSides = {
    player1: 'player-cards',
    computer: 'computer-cards'
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
        id: 0,
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

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener('click', () => {
            setCardField(cardImage.getAttribute('data-id'))
        })
    }

    cardImage.addEventListener('mouseover', () => {
        drawSelectedCard(idCard)
    })

    return cardImage
}

function init() {
    drawCards(5, playerSides.player1)
    drawCards(5, playerSides.computer)
}

init()