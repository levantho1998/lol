import React, { Component } from 'react'
import Nav from '../../components/client/Nav'
import UserSideBar from '../../components/client/UserSideBar'
import CheckoutForm from '../../components/client/CheckoutForm'
import '../../css/client/Checkout.css'
import { ElementsConsumer } from '@stripe/react-stripe-js';
import { connect } from 'react-redux'
import { actCreateOrder, actCloseCartItem, actRemoveAllCart } from '../../actions/index'
class Checkout extends Component {
    render() {
        let { user, cart, onCreateOrder, history, onCloseCartItem, onRemoveAllCart } = this.props
        console.log(history)
        return (
            <div>
                <Nav />
                <div className="checkout user-container">
                    <div className="side-bar">
                        <UserSideBar />
                    </div>
                    <ElementsConsumer>
                        {({ stripe, elements }) => (
                            <CheckoutForm
                                stripe={stripe}
                                elements={elements}
                                user={user}
                                cart={cart}
                                onCreateOrder={onCreateOrder}
                                history={history}
                                onCloseCartItem={onCloseCartItem}
                                onRemoveAllCart={onRemoveAllCart}
                            />
                        )}
                    </ElementsConsumer>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateOrder: (order) => {
            dispatch(actCreateOrder(order))
        },
        onCloseCartItem: () => {
            dispatch(actCloseCartItem())
        },
        onRemoveAllCart: () => {
            dispatch(actRemoveAllCart())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)