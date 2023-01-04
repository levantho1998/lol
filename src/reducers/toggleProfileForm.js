import * as Types from '../constants/ActionTypes'

let initialstate = false

const statusProfileForm = (state = initialstate, actions) => {
    switch (actions.type) {
        case Types.TOGGLE_PROFILE_FORM:
            state = !state
            return state
        default:
            return state
    }
}

export default statusProfileForm