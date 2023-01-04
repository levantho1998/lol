import React, { Component } from 'react'

class CartBtnRelated extends Component {
    constructor(pros) {
        super(pros)

    }
    render() {
        return (
            <div className="cart-btn">
                <button className={type === 'related' ? 'btn related' : 'btn'} onClick={() => this.props.onAddToCart(product)}>
                    <FontAwesomeIcon icon={faShoppingBasket} />
                    {
                        type === 'related' ? <p>Cart</p> : <p>Add to cart</p>
                    }
                </button>
                {/* <QuantityAdjustment /> */}
            </div>
        )
    }
}

export default CartBtnRelated