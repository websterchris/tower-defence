type DefenderType = 'archer' | 'crossbow' | 'longbow' | 'catapult'
interface Defender {
    id: DefenderType
    x: number
    y: number
    shooting: boolean
}

interface Enemy {
    life: number
    x: number
    y: number
    movingAxis: 'x' | 'y'
    waypointIndex: number
    sprite: PIXI.Sprite
    score: number
    speed: number
}
