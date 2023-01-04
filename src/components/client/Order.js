import React, { Component } from 'react'

class Order extends Component {

    render() {
        let { order, index, onGetIndexOrderSelected, indexOrderSelected } = this.props
        console.log(index, indexOrderSelected)
        return (
            <div className={index === indexOrderSelected ? 'order-active order' : 'order'} onClick={() => onGetIndexOrderSelected(index)}>
                <div className="w-100">
                    <div className="header">Order#{index + 1}</div>
                    <div className="body">
                        <div className="order-info">
                            Order Date:
                            <span>{order.date}</span>
                        </div>
                        <div className="order-info">
                            Order Id:
                            <span>{order._id}</span>
                        </div>
                        <div className="order-info">
                            Total Price:
                            <span>${order.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Order