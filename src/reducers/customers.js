import * as Types from '../constants/ActionTypes'

let initialstate = []

const customers = (state = initialstate, actions) => {
    let { customers } = actions
    switch (actions.type) {
        case Types.GET_ALL_CUSTOMERS:
            state = customers
            return [...state]
        case Types.FILTER_CUSTOMERS:
            state = customers
            return [...state]
        default:
            return [...state]
    }
}

export default customers