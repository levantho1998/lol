import * as Types from '../constants/ActionTypes'

let initialstate = false

const statusCartitem = (state = initialstate, actions) => {

    switch (actions.type) {
        case Types.OPEN_CARTITEM:
            state = !state
            console.log(state)
            return state
        case Types.CLOSE_CARTITEM:
            state = !state
            return state
        case Types.CARTBTN_CLICK:
            state = true
            // setTimeout(() => {
            //     return state = false
            // }, 2000)
            // console.log(state)
            return state
        default:
            return state
    }
}

export default statusCartitem