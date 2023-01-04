import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import '../../css/client/Cart.css'

import { connect } from 'react-redux'
import { actOpenCartItem } from '../../actions/index'

class Cart extends Component {
    openCartItem = () => {
        this.props.openCartItem()
    }

    totalQuantity = (cart) => {
        let totalQuantity = null
        cart.forEach(element => {
            totalQuantity += element.quantity
        });
        return totalQuantity
    }

    totalPrice = (cart) => {
        let totalPrice = null
        cart.forEach(element => {
            totalPrice += element.product.price * element.quantity
        });
        return totalPrice
    }

    render() {
        let { cart } = this.props
        return (
            <div className={"cart"} onClick={this.openCartItem}>
                <div className="item-amount">
                    <FontAwesomeIcon className="mr-2" icon={faShoppingBag} />
                    {cart.length > 0 ? this.totalQuantity(cart) : 0} {cart.length > 0 && this.totalQuantity(cart) < 2 ? 'item' : 'items'}

                </div>
                <div className="total-price">
                    <p>
                        {/* ${cart !== undefined ? this.totalPrice(cart) : 0.00} */}
                        ${cart.length > 0 ? this.totalPrice(cart) : 0}
                        {/* $0.00 */}
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        statusCartItem: state.statusCartItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openCartItem: () => {
            dispatch(actOpenCartItem())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)