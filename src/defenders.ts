import { decreaseBalance } from './balance'

type DefenderTypes = {
    [key in DefenderType]?: {
        id: DefenderType
        price: number
        color: number
        damage: number
        size: number
    }
}

const defenderTypes: DefenderTypes = {
    archer: {
        id: 'archer',
        color: 0xf1faee,
        price: 25,
        damage: 3,
        size: 10
    },
    longbow: {
        id: 'longbow',
        color: 0xe9c46a,
        price: 50,
        damage: 4,
        size: 10
    },
    crossbow: {
        id: 'crossbow',
        color: 0xffc6ff,
        price: 100,
        damage: 6,
        size: 10
    },
    catapult: {
        id: 'catapult',
        color: 0xef476f,
        price: 350,
        damage: 8,
        size: 20
    }
}

let defenders: Defender[] = []
let selectedDefender: DefenderType = 'archer'

export const addDefender = (defender: Defender) => {
    const { price } = defenderTypes[defender.id]
    decreaseBalance(price)
    defenders.push(defender)
}

export const getDefenders = () => defenders

export const checkIfCanShoot = (enemy: Enemy) => {
    const shoot = defenders.filter(defender => {
        const { x, y } = defender
        if (
            !defender.shooting &&
            (enemy.sprite.x === x + 40 || enemy.sprite.x === x - 40) &&
            (enemy.sprite.y === y + 40 || enemy.sprite.y === y - 40)
        ) {
            defender.shooting = true
            setTimeout(() => {
                defender.shooting = false
            }, 500)
            return true
        }
        return false
    })
    if (!!shoot.length) {
        enemy.life -= defenderTypes[shoot[0].id].damage
        return enemy
    }
    return enemy
}

export const getSelectedDefender = () => defenderTypes[selectedDefender]

export const setSelectedDefender = (defender: DefenderType) => {
    document.getElementById(selectedDefender).classList.remove('active')
    document.getElementById(defender).classList.add('active')
    selectedDefender = defender
}
