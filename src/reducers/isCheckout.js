import * as Types from '../constants/ActionTypes'

let initialstate = false

const isCheckout = (state = initialstate, actions) => {
    switch (actions.type) {
        case Types.CHECKOUT_CLICK:
            state = !state
            return state
        default:
            return state
    }
}

export default isCheckout