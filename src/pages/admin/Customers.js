import React, { Component } from 'react'
import Header from '../../components/admin/Header'
import Nav from '../../components/admin/NavAdmin'
import TaskBar from '../../components/admin/TaskBar'
import { Container, Row, Col, Table } from 'reactstrap'
import { connect } from 'react-redux'
import { 
    actGetAllCustomersRequest, 
    actGetAllOrderRequestAdmin, 
    actFilterCustomersRequest,
} from '../../actions/index'
import { Redirect } from 'react-router-dom'
class Customers extends Component {

    componentDidMount() {
        this.props.onGetAllCustomers()
        this.props.onGetAllOrders()
    }

    // paginate = (number) => {
    //     this.setState({
    //         currentPage: number
    //     })
    // }

    totalAmount = (arr) => {
        let totalAmount = null
        arr.forEach(element => {
            totalAmount += element.totalPrice
        })
        return totalAmount
    }

    render() {
        let adminToken = localStorage.getItem('adminToken')
        if (!adminToken) {
            return <Redirect to="/admin/login" />
        }
        let { 
            customers, 
            orders, 
            onFilterCustomers,
        } = this.props
        customers.forEach(customer => {
            let result = orders.filter(order => order.email === customer.email)
            let totalOrder = result.length
            let totalAmount = this.totalAmount(result)
            customer.totalOrder = totalOrder
            customer.totalAmount = totalAmount
        });
        return (
            <React.Fragment>
                <Header />
                <Nav match={this.props.match} />
                <div className="AdminProducts admin-page">
                    <Container>
                        <React.Fragment>
                            <Row style={{ padding: "0 15px" }}>
                                <Col className="admin-col mb-4 pb-0">
                                    <TaskBar type="Customers" onFilterCustomers={onFilterCustomers} />
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
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Contact</th>
                                                <th>Email</th>
                                                <th>Total Order</th>
                                                <th>Total Amount</th>
                                                <th>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                customers.map((customer, index) =>
                                                    <tr key={customer._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{customer._id}</td>
                                                        <td>{customer.name}</td>
                                                        <td>{customer.phone}</td>
                                                        <td>{customer.email}</td>
                                                        <td>{customer.totalOrder ? customer.totalOrder : '0'}</td>
                                                        <td>${customer.totalAmount ? customer.totalAmount : '0'}</td>
                                                        <td>{customer.address}</td>
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
        customers: state.customers,
        orders: state.order,
        isOpenFormProduct: state.isOpenFormProduct,
        productEditing: state.productEditing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllCustomers: () => {
            dispatch(actGetAllCustomersRequest())
        },
        onGetAllOrders: () => {
            dispatch(actGetAllOrderRequestAdmin())
        },
        onFilterCustomers: (name) => {
            dispatch(actFilterCustomersRequest(name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers)