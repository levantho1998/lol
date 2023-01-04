import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import '../../css/client/QuantityAdjustment.css'
class QuantityAdjustment extends Component {
    render() {
        let { cartCurrently, product, type, onAddToCart, onDecreaseCart } = this.props
        // console.log(cart, product)
        // let id = product.id
        // let cartCurrently = cart.find(element => element.product.id === id)
        // console.log(cartCurrently)
        // let quantity = cartCurrently.quantity
        return (
            <div className={type === "cart" ? "QuantityAdjustment cart-style" : "QuantityAdjustment"}>
                <div className="decrease adj" onClick={() => onDecreaseCart(product)}>
                    <FontAwesomeIcon icon={faMinus} />
                </div>
                <div className="number">{cartCurrently.quantity}</div>
                <div className="increase adj" onClick={() => onAddToCart(product)}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
        );
    }
}

export default QuantityAdjustment