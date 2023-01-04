import React, { Component } from 'react'
import Header from '../../components/admin/Header'
import Nav from '../../components/admin/NavAdmin'
import TaskBar from '../../components/admin/TaskBar'
import { connect } from 'react-redux'
import { actGetAllOrderRequestAdmin, actFilterOrdersRequest } from '../../actions/index'
import { Container, Row, Col, Table } from 'reactstrap'
import '../../css/admin/Orders.css'
import { Redirect } from 'react-router-dom'
class Orders extends Component {
    constructor(pros) {
        super(pros)
        this.state = {
            payment: '',
            amount: '',
            keyword_email: ''
        }
    }

    getKeywordOrders = (keyword) => {
        console.log(keyword)
        this.setState({
            keyword_email: keyword
        })
    }

    getFilterOrders = (payment, amount) => {
        console.log(payment, amount)
        this.setState({
            payment: payment,
            amount: amount
        })
    }

    componentDidMount() {
        this.props.onGetAllOrders()
    }

    // showProducts = (products) => {
    //     let result = null
    //     if (products.length > 0) {
    //         result = products.map((product, index) => {
    //             return <Product key={index} product={product} type="admin" />
    //         })
    //     }
    //     return result
    // }

    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }

    render() {
        let adminToken = localStorage.getItem('adminToken')
        if (!adminToken) {
            return <Redirect to="/admin/login" />
        }
        let { orders, onFilterOrders } = this.props
        let { payment, amount, keyword_email } = this.state
        return (
            <React.Fragment>
                <Header />
                <Nav match={this.props.match} />
                <div className="AdminProducts admin-page">
                    <Container>
                        <React.Fragment>
                            <Row style={{ padding: "0 15px" }}>
                                <Col className="admin-col mb-4 pb-0">
                                    <TaskBar
                                        type="Orders"
                                        onFilterOrders={onFilterOrders}
                                        getKeywordOrders={this.getKeywordOrders}
                                        getFilterOrders={this.getFilterOrders}
                                        payment={payment}
                                        amount={amount}
                                        keyword_email={keyword_email}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ padding: "0 15px" }}>
                                <Col
                                    className="admin-col p-0"
                                    style={{
                                        overflow: "auto",
                                        maxHeight: "450px",
                                    }}
                                >
                                    <Table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Number</th>
                                                <th>Order Id</th>
                                                <th>Time</th>
                                                <th>Amount</th>
                                                <th>Payment Method</th>
                                                <th>Customer's Email</th>
                                                <th>Contact</th>
                                                <th>Delivery Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders.map((order, index) =>
                                                    <tr key={order._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{order._id}</td>
                                                        <td>{order.date}</td>
                                                        <td>${order.totalPrice}</td>
                                                        <td>{order.payment === 'cash' ? 'Cash On Delivery' : 'Online Payment'}</td>
                                                        <td>{order.email}</td>
                                                        <td>{order.phone}</td>
                                                        <td>{order.address}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </React.Fragment>
                    </Container>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllOrders: () => {
            dispatch(actGetAllOrderRequestAdmin())
        },
        onFilterOrders: (payment_method, amount, email) => {
            dispatch(actFilterOrdersRequest(payment_method, amount, email))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)