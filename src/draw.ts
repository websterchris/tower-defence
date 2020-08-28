import * as PIXI from 'pixi.js'
import { addDefender, getSelectedDefender } from './defenders'
import { getBalance } from './balance'

import { path } from './constants/path'

const Sprite = PIXI.Sprite
const Graphics = PIXI.Graphics
const Rectangle = PIXI.Rectangle

export const drawTower = (x: number, y: number, resources: PIXI.IResourceDictionary) => {
    const tower = new Sprite(resources['tower'].texture)
    tower.width = 20
    tower.height = 20
    tower.position.set(x, y)
    return tower
}

export const drawMap = (width: number, height: number, resources: PIXI.IResourceDictionary) => {
    const map = new Sprite(resources['map'].texture)
    map.width = width
    map.height = height
    map.position.set(0, 0)
    return map
}

export const drawDefender = (mouseData: PIXI.InteractionEvent, app: PIXI.Application) => {
    if (getBalance() < 50) {
        return
    }
    const { color, id, size } = getSelectedDefender()
    let circle = new Graphics()
    circle.lineStyle(1, color, 1)
    circle.drawCircle(0, 0, size)
    circle.x = mouseData.target.x + size * 2
    circle.y = mouseData.target.y + size * 2
    app.stage.addChild(circle)
    addDefender({
        id,
        x: mouseData.target.x + size * 2,
        y: mouseData.target.y + size * 2,
        shooting: false
    })
}

export const drawDefenderHover = (mouseData: PIXI.InteractionEvent, app: PIXI.Application) => {
    const { color, size } = getSelectedDefender()
    let circle = new Graphics()
    circle.lineStyle(1, color, 1)
    circle.drawCircle(0, 0, size)
    circle.x = mouseData.target.x + size * 2
    circle.y = mouseData.target.y + size * 2
    app.stage.addChild(circle)
    return circle
}

let hover: PIXI.Graphics
let test = []

export const drawGrid = (width: number, height: number, app: PIXI.Application) => {
    for (let x = 0; x < width; x += 40) {
        for (let y = 0; y < height; y += 40) {
            const onPath = !!path.filter(pathCoords => pathCoords[0] === x && pathCoords[1] === y).length

            if (onPath) {
                continue
            }

            let rectangle = new Graphics()
            rectangle.interactive = true
            rectangle.hitArea = new Rectangle(0, 0, 40, 40)
            rectangle.lineStyle(1, 0x74c69d, 1)
            rectangle.drawRect(0, 0, 40, 40)
            rectangle.x = x
            rectangle.y = y
            rectangle.addListener('click', (mouseData: PIXI.InteractionEvent) => drawDefender(mouseData, app))
            rectangle.addListener('mouseover', (mouseData: PIXI.InteractionEvent) => {
                const { size } = getSelectedDefender()
                const outOfBoundsTop = mouseData.currentTarget.y - size * 2 === 0
                const outOfBoundsBottom = mouseData.currentTarget.y + size * 2 === 600
                const outOfBoundsLeft = mouseData.currentTarget.x - size * 2 === 0
                const outOfBoundsRight = mouseData.currentTarget.x + size * 2 === 800
                const onPath = !!path.filter(pathCoords => {
                    return pathCoords[0] - size * 2 === mouseData.currentTarget.x && pathCoords[1] - size * 2 === mouseData.currentTarget.y
                }).length

                if (outOfBoundsTop || outOfBoundsBottom || outOfBoundsLeft || outOfBoundsRight || onPath) {
                    return
                }
                hover = drawDefenderHover(mouseData, app)
            })
            rectangle.addListener('mouseout', () => app.stage.removeChild(hover))
            app.stage.addChild(rectangle)
        }
    }
}

export const drawEnemy = (resources: PIXI.IResourceDictionary, type: number) => {
    const enemy = new Sprite(resources[`enemy-${type}`].texture)
    enemy.width = 20
    enemy.height = 20
    enemy.position.set(60, 0)
    enemy.anchor.set(0.5)
    return enemy
}
