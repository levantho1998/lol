import * as Types from '../constants/ActionTypes'

// let orders = localStorage.getItem('orders')

// let initialstate = orders ? JSON.parse(orders) : []

let initialstate = []


const order = (state = initialstate, actions) => {
    let { order, orders } = actions
    switch (actions.type) {
        case Types.CREATE_ORDER:
            state.push(order)
            console.log(state)
            // localStorage.setItem('orders', JSON.stringify(state))
            return [...state]
        case Types.GET_ALL_ORDER:
            console.log(orders)
            state = orders
            console.log(state)
            return [...state]
        case Types.GET_ALL_ORDER_ADMIN:
            state = orders
            return [...state]
        case Types.FILTER_ORDERS:
            state = orders
            return [...state]
        default:
            return [...state]
    }
}

export default order