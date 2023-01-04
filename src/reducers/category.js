import * as Types from '../constants/ActionTypes'


let initialstate = []

let findIndex = (category, id) => {
    var result = -1;
    category.forEach((item, index) => {
        if (item._id === id) {
            result = index;
        }
    });
    return result
}

const category = (state = initialstate, actions) => {
    switch (actions.type) {
        case Types.GET_ALL_CATEGORY:
            console.log(actions.category)
            state = actions.category
            return [...state]
        case Types.ADD_CATEGORY:
            let newCategory = actions.category
            state.push(newCategory)
            return [...state]
        case Types.DELETE_CATEGORY:
            let index = findIndex(state,actions.category._id)
            state.splice(index,1)
            return [...state]
        case Types.FILTER_CATEGORY_ADMIN:
            let category = actions.category
            state = category
            return [...state]
        default:
            return [...state]
    }
}

export default category

