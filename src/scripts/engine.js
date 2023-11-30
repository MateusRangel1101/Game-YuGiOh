const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('socre_points')
    },
    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },
    fieldCards: {
        player: getElementById('player-field-card'),
        computer: getElementById('computer-field-card'),
    },
    actions: {
        button: getElementById('next-duel')
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
        id: 0,
        name: 'Exodia',
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winfOf: [0],
        loseOf: [1],
    }
]

function init() {

}

init()