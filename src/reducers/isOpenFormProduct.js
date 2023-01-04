import * as Types from '../constants/ActionTypes'

let initialstate = false

const isOpenFormProduct = (state = initialstate, actions) => {
    switch (actions.type) {
        case Types.TOGGLE_FORM_PRODUCT:
            state = !state
            return state
        default:
            return state
    }
}

export default isOpenFormProduct