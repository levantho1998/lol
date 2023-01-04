import React, { Component } from 'react'
import { Col } from 'reactstrap'
class Filter extends Component {
    constructor(pros) {
        super(pros)
        this.state = {
            category: 'Category Type',
            price: 'Price',
            payment: 'Payment Method',
            amount: 'Amount',
            orderAmount: 'Order Amount',
        }
    }

    handeChange = (e) => {
        let { price } = this.state
        let { keyword } = this.props
        let target = e.target
        let name = target.name
        let value = target.value
        if (keyword) {
            if (price) {
                this.props.onFilterProducts(keyword, value, price)
            }
            else {
                this.props.onFilterProducts(keyword, value, '')
            }
        }
        if (!keyword) {
            if (price) {
                this.props.onFilterProducts('', value, price)
            }
            else {
                this.props.onFilterProducts('', value, '')
            }
        }

        // truyen state sang component Main
        if (price && price !== 'Price') {
            this.props.getFilter(value, price)
        }
        else {
            this.props.getFilter(value, '')
        }
        this.setState({
            [name]: value
        })
    }

    handeChangeFilterPrice = (e) => {
        let { category } = this.state
        let { keyword } = this.props
        let target = e.target
        let name = target.name
        let value = target.value
        if (keyword) {
            if (category && category !== 'Category Type') {
                this.props.onFilterProducts(keyword, category, value)
            }
            if (category && category === 'Category Type') {
                this.props.onFilterProducts(keyword, '', value)
            }
        }
        if (!keyword) {
            if (category && category !== 'Category Type') {
                this.props.onFilterProducts('', category, value)
            }
            else {
                this.props.onFilterProducts('', '', value)
            }
        }

        // truyen state sang component Main
        if (category && category !== 'Category Type') {
            this.props.getFilter(category, value)
        }
        else {
            this.props.getFilter('', value)
        }

        this.setState({
            [name]: value
        })
    }

    handeChangePayment = (e) => {
        let { amount } = this.state
        let { keyword_email } = this.props
        let target = e.target
        let name = target.name
        let value = target.value
        if (amount && amount !== 'Amount') {
            this.props.onFilterOrders(value, amount, keyword_email)
        }
        else {
            this.props.onFilterOrders(value, '', keyword_email)
        }

        // truyen state sang page Orders
        if (amount && amount !== 'Amount') {
            this.props.getFilterOrders(value, amount)
        }
        else {
            this.props.getFilterOrders('', amount)
        }
        this.setState({
            [name]: value
        })

    }

    handeChangeAmount = (e) => {
        let { payment } = this.state
        let { keyword_email } = this.props
        let target = e.target
        let name = target.name
        let value = target.value
        if (payment && payment !== 'Payment Method') {
            this.props.onFilterOrders(payment, value, keyword_email)
        }
        else {
            this.props.onFilterOrders('', value, keyword_email
            )
        }

        // truyen state sang page Orders
        if (payment && payment !== 'Payment Method') {
            this.props.getFilterOrders(payment, value)
        }
        else {
            this.props.getFilterOrders(payment, '')
        }

        this.setState({
            [name]: value
        })
    }

    showOption = (list) => {
        let result = null
        result = list.map((item, index) => <option key={index} value={item}>{item}</option>)
        return result
    }

    render() {
        // const listCategory = ['Category Type', 'Children Literature', 'Comic Book', 'Fantasy', 'Horror', 'Novel', 'Romantic', 'Science Fiction', 'Thriller']
        const listPaymentMethod = ['Payment Method', 'Cash On Delivery', 'Online Payment']
        const listAmount = ['Amount', 'Highest to Lowest', 'Lowest to Highest']
        const listPrice = ['Price', 'Highest to Lowest', 'Lowest to Highest']
        const listOrderAmount = ['Order Amount', 'Highest to Lowest', 'Lowest to Highest']
        let { category, price, payment, amount, orderAmount } = this.state
        let { type } = this.props
        // console.log(this.state)
        switch (type) {
            case "Orders":
                return (
                    <React.Fragment>
                        <Col xl="3" className="Filter mb-3 mb-xl-0">
                            <select
                                name="payment"
                                onChange={this.handeChangePayment}
                                value={payment}
                                className="name "
                                style={{ color: "rgb(22, 31, 106)", fontWeight: "600" }}
                            >
                                {this.showOption(listPaymentMethod)}
                            </select>
                        </Col>
                        <Col xl="3" className="Filter mb-3 mb-xl-0">
                            <select
                                name="amount"
                                onChange={this.handeChangeAmount}
                                value={amount}
                                className="name"
                                style={{ color: "rgb(22, 31, 106)", fontWeight: "600" }}
                            >
                                {this.showOption(listAmount)}
                            </select>
                        </Col>
                    </React.Fragment>
                )
            case "Customers":
                return (
                    <React.Fragment>
                        <Col xl="3" className="Filter mb-3 mb-xl-0">
                            <select
                                name="orderAmount"
                                onChange={this.handeChange}
                                value={orderAmount}
                                className="name"
                                style={{ color: "rgb(22, 31, 106)", fontWeight: "600" }}
                            >
                                {this.showOption(listOrderAmount)}
                            </select>
                        </Col>
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <Col xl="3" className="Filter mb-3 mb-xl-0">
                            <select
                                name="category"
                                onChange={this.handeChange}
                                value={category}
                                className="name"
                                style={{ color: "rgb(22, 31, 106)", fontWeight: "600" }}
                            >
                                {/* {this.showOption(listCategory)} */}
                                {/* <option value='Category Type'>Category Type</option>
                                <option value='Children Literature'>Children Literature</option>
                                <option value='Comic Book'>Comic Book</option>
                                <option value='Fantasy'>Fantasy</option>
                                <option value='Horror'>Horror</option>
                                <option value='Novel'>Novel</option>
                                <option value='Romantic'>Romantic</option>
                                <option value='Science Fiction'>Science Fiction</option>
                                <option value='Thriller'>Thriller</option> */}
                                <option value='Category Type'>Category Type</option>
                                {
                                    this.props.category.map(item =><option key={item._id} value={item.name}>{item.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col xl="3" className="Filter mb-3 mb-xl-0">
                            <select
                                name="price"
                                onChange={this.handeChangeFilterPrice}
                                value={price}
                                className="name"
                                style={{ color: "rgb(22, 31, 106)", fontWeight: "600" }}
                            >
                                {this.showOption(listPrice)}
                            </select>
                        </Col>
                    </React.Fragment>
                )
        }

    }
}

export default Filter