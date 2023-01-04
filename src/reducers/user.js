import * as Types from '../constants/ActionTypes'

let userLogin = localStorage.getItem('user')

let initialstate = userLogin ? JSON.parse(userLogin) : {}

const user = (state = { ...initialstate }, actions) => {
    let { user } = actions
    switch (actions.type) {
        case Types.LOGIN:
            state = user
            console.log(state)
            localStorage.setItem('user', JSON.stringify(user))
            return { ...state }
        case Types.LOGOUT:
            state = {}
            localStorage.removeItem('user')
            return { ...state }
        case Types.UPDATE_USERPROFILE:
            state = user
            localStorage.setItem('user', JSON.stringify(user))
            return { ...state }
        default:
            return state
    }
}

export default user