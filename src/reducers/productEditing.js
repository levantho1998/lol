import * as Types from '../constants/ActionTypes'

let initialstate = {}

const productEditing = (state = initialstate, actions) => {
    switch (actions.type) {
        case Types.GET_PRODUCT_UPDATE:
            state = actions.product
            return { ...state }
        case Types.RESET_PRODUCT_UPDATE:
            state = {}
            return { ...state }
        default:
            return { ...state }
    }
}

export default productEditing