import * as PIXI from 'pixi.js'

import { addEnemy, updateEnemies, createEnemy } from './enemies'

let level = 1
let loop: number

interface LevelConfig {
    maxEnemies: number
    enemyFrequency: number
    enemySpeed: number
}

const getLevel = (): LevelConfig => {
    return {
        maxEnemies: 1,
        enemyFrequency: 500,
        enemySpeed: 2
    }
}

export const startLevel = (resources: PIXI.IResourceDictionary, app: PIXI.Application) => {
    let count = 0
    renderLevel()
    const { enemyFrequency, enemySpeed, maxEnemies } = getLevel()
    loop = setInterval(() => {
        const enemy = createEnemy(resources, enemySpeed)
        addEnemy(enemy)
        app.stage.addChild(enemy.sprite)
        count++
        if (count === maxEnemies) {
            clearInterval(loop)
            loop = null
        }
    }, enemyFrequency)
}

export const looping = () => !!loop

export const bumpLevel = () => level++

export const renderLevel = () => {
    document.getElementById('level').children[0].innerHTML = level.toString()
}
