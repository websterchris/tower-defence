let balance = 150

export const incrementBalance = (value: number) => {
    balance += value
    renderBalance()
}

export const decreaseBalance = (value: number) => {
    balance -= value
    renderBalance()
}

export const renderBalance = () => {
    document.getElementById('balance').children[0].innerHTML = balance.toString()
}

export const getBalance = () => balance
