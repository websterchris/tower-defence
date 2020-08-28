import * as PIXI from 'pixi.js'

import { drawTower, drawMap, drawGrid } from './draw'
import { addEnemy, updateEnemies, createEnemy, getEnemies } from './enemies'
import { renderBalance } from './balance'
import { setSelectedDefender } from './defenders'
import { startLevel, looping, bumpLevel } from './levels'

const Application = PIXI.Application
const loader = PIXI.Loader.shared
const resources = loader.resources

const canvas = {
    height: 600,
    width: 800
}

let loop: number

const towerPosition = { x: 40, y: 540 }

const app = new Application({
    width: canvas.width,
    height: canvas.height
})

const gameLoop = () => {
    requestAnimationFrame(gameLoop)
    updateEnemies()
    if (getEnemies().length === 0 && !looping()) {
        bumpLevel()
        startLevel(resources, app)
    }
}

const setup = () => {
    app.stage.addChild(drawMap(canvas.width, canvas.height, resources))
    drawGrid(canvas.width, canvas.height, app)
    app.stage.addChild(drawTower(towerPosition.x, towerPosition.y, resources))
    renderBalance()
    startLevel(resources, app)
    gameLoop()
}

const loadSprites = () => {
    loader
        .add({ name: 'tower', url: 'assets/cat.png' })
        .add({ name: 'map', url: 'assets/map.png' })
        .add({ name: 'enemy-1', url: 'assets/cat.png' })
        .add({ name: 'enemy-2', url: 'assets/enemy-2.png' })
        .load(setup)
}

document.addEventListener('keydown', ({ keyCode }: KeyboardEvent) => {
    const codes = {
        49: () => setSelectedDefender('archer'),
        50: () => setSelectedDefender('longbow'),
        51: () => setSelectedDefender('crossbow'),
        52: () => setSelectedDefender('catapult')
    }
    codes[keyCode]?.()
})

loadSprites()
document.getElementById('canvas').appendChild(app.view)
