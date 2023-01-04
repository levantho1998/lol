import * as Types from '../constants/ActionTypes'

// let data = localStorage.getItem('products')

// let initialstate = data ? JSON.parse(data) : []
let initialstate = []

let findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if (product._id === id) {
            result = index;
        }
    });
    return result
}

const products = (state = initialstate, actions) => {
    switch (actions.type) {
        case Types.GET_ALL_PRODUCT:
            console.log('delete')
            state = actions.products
            // localStorage.setItem('products', JSON.stringify(state))
            return [...state]
        case Types.FILTER_CATEGORY:
            state = actions.products
            console.log(state)
            return [...state]
        case Types.FIND_PRODUCT:
            state = actions.product
            console.log(state)
            return [...state]
        case Types.GET_ONE_PRODUCT:
            let { id } = actions
            let result = state.find(product => product._id === id)
            console.log(result)
            return result
        case Types.FILTER_PRODUCTS_ADMIN:
            state = actions.products
            return [...state]
        case Types.FILTER_PRODUCTS_BY_NAME:
            state = actions.products
            return [...state]
        case Types.DELETE_PRODUCT:
            let index = findIndex(state,actions.product._id)
            console.log(index)
            state.splice(index,1)
            return [...state]
        case Types.ADD_PRODUCT:
            state.push(actions.product)
            return [...state]
        case Types.UPDATE_PRPODUCT:
            let indexProductUpdate = findIndex(state,actions.product._id)
            state[indexProductUpdate] = actions.product
            // state.splice(indexProductUpdate,1)
            // let newProduct = actions.product
            // state.push(newProduct)
            // console.log(state[indexProductUpdate])
            return [...state]
        default:
            return [...state]
    }
}

export default products

