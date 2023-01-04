import * as Types from '../constants/ActionTypes'

let cartItem = localStorage.getItem('cart')

let initialstate = cartItem ? JSON.parse(cartItem) : []

let findProductInState = (state, product) => {
    let index = -1
    for (let i = 0; i < state.length; i++) {
        if (state[i].product._id === product._id) {
            index = i
            break
        }
    }
    return index
}

const cart = (state = initialstate, actions) => {
    let index = -1
    let { product } = actions
    switch (actions.type) {
        case Types.ADD_TO_CART:
            index = findProductInState(state, product)
            if (index !== -1) {
                state[index].quantity += 1
            }
            else {
                state.push({
                    product,
                    quantity: 1
                })
            }
            localStorage.setItem('cart', JSON.stringify(state))
            return [...state]
        case Types.DECREASE_CART:
            index = findProductInState(state, product)
            state[index].quantity -= 1
            if (state[index].quantity === 0) {
                state.splice(index, 1)
            }
            localStorage.setItem('cart', JSON.stringify(state))
            return [...state]
        case Types.DELETE_CART:
            index = findProductInState(state, product)
            state.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(state))
            return [...state]
        case Types.REMOVE_ALL_CART:
            state = []
            return [...state]
        default:
            return state
    }
}

export default cart