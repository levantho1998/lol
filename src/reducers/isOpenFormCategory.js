import * as Types from '../constants/ActionTypes'

let initialstate = false

const isOpenFormCategory = (state = initialstate, actions) => {
    switch (actions.type) {
        case Types.TOGGLE_FORM_CATEGORY:
            state = !state
            return state
        default:
            return state
    }
}

export default isOpenFormCategory