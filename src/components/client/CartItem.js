import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faTimes } from "@fortawesome/free-solid-svg-icons";
import '../../css/client/Cartitem.css'
import { connect } from 'react-redux'
import { actCloseCartItem, actCheckoutClick } from '../../actions/index'
import QuantityAdjustment from '../../components/client/QuantityAdjustment'
import { Link, Redirect } from 'react-router-dom'
class CartItem extends Component {
    constructor(pros) {
        super(pros)
        this.state = {
            isToken: false
        }
    }

    closeCartItem = () => {
        this.props.closeCartItem()
    }

    totalPrice = (cart) => {
        let totalPrice = null
        cart.forEach(element => {
            totalPrice += element.product.price * element.quantity
        });
        return totalPrice
    }

    handleClick = (e) => {
        e.preventDefault()
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.setState({
                isToken: true
            })
        }
        else {
            this.props.onCheckoutClick()
        }
    }

    render() {
        if (this.state.isToken) {
            return <Redirect to="/checkout" />
        }
        let { statusCartItem, cart, onAddToCart, onDecreaseCart, onDeleteCart } = this.props
        let totalQuantity = null
        cart.forEach(element => {
            totalQuantity += element.quantity
        });
        let cartItems = cart.map(item =>
            <div key={item.product._id} className="item">
                <QuantityAdjustment type="cart" cartCurrently={item} onAddToCart={onAddToCart} onDecreaseCart={onDecreaseCart} product={item.product} />
                <div className="img">
                    <img src={item.product.img} alt="" />
                </div>
                <div className="info">
                    <div className="title">{item.product.name}</div>
                    <div className="price">${item.product.price} </div>
                    <div className="quantity">{item.quantity} pc(s)</div>
                </div>
                <div className="total-price">${item.product.price * item.quantity}</div>
                <FontAwesomeIcon icon={faTimes} className="ml-4" onClick={() => onDeleteCart(item.product)} />
            </div>
        )
        return (
            <div className={statusCartItem === true ? "cart-item c-show" : "cart-item"}>
                <div className="header">
                    <div className="item-amount">
                        <FontAwesomeIcon className="mr-2" icon={faShoppingBag} />
                        {totalQuantity > 0 ? totalQuantity : 0} {totalQuantity < 2 ? 'item' : 'items'}
                    </div>
                    <FontAwesomeIcon icon={faTimes} className="close" onClick={this.closeCartItem} />
                </div>
                <div className="body">
                    {
                        cart.length === 0 && <span style={{
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "rgb(119, 121, 140)",
                            display: "block",
                            width: "100%",
                            textAlign: "center",
                            padding: "40px 0px"
                        }}>
                            Not Products found</span>
                    }
                    {cartItems}
                </div>
                <Link to="/checkout" className={cart.length === 0 ? "footer disable-btn" : "footer"} onClick={this.handleClick}>
                    <span style={{
                        color: [cartItems.length === 0 ? 'rgb(0, 158, 127)' : '']
                    }}>Checkout</span>
                    <div className="total">
                        ${cart.length > 0 ? this.totalPrice(cart) : 0.00}
                    </div>
                </Link>
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
        closeCartItem: () => {
            dispatch(actCloseCartItem())
        },
        onCheckoutClick: () => {
            dispatch(actCheckoutClick())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartItem)