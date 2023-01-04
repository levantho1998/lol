import * as Types from '../constants/ActionTypes'

let initialstate = 'signin'

const changeForm = (state = initialstate, actions) => {
    switch (actions.type) {
        case Types.OPEN_FORM_SIGNUP:
            state = 'signup'
            return state
        case Types.OPEN_FORM_SIGNIN:
            state = 'signin'
            return state
        default:
            return state
    }
}

export default changeForm