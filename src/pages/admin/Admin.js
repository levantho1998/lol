import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { faDollarSign, faCartArrowDown, faUserCircle, faTruck } from "@fortawesome/free-solid-svg-icons";
import Statistic from '../../components/admin/Statistic'
import Header from '../../components/admin/Header'
import Nav from '../../components/admin/NavAdmin'
import Sale from '../../components/admin/Sale'
import '../../css/admin/Admin.css'
import { connect } from 'react-redux'
import { actGetAllOrderRequestAdmin, actGetAllCustomersRequest } from '../../actions/index'
import {Redirect} from 'react-router-dom'

class Admin extends Component {

    componentDidMount() {
        this.props.onGetAllOrders()
        this.props.onGetAllCustomers()
    }

    render() {
        let adminToken = localStorage.getItem('adminToken')
        if (!adminToken) {
            return <Redirect to="/admin/login" />
        }
        let { orders, customers} = this.props
        let revenue = orders.reduce((result, current) => {
            result += current.totalPrice
            return result
        }, 0)
        const statistics = [
            { title: 'Total Revenue', icon: faDollarSign, background: 'rgb(255, 232, 178)', color: 'rgb(255, 179, 0)', data: revenue },
            { title: 'Total Order', icon: faCartArrowDown, background: 'rgb(250, 202, 202)', color: 'rgb(255, 110, 110)', data: orders.length },
            { title: 'New Customer', icon: faUserCircle, background: 'rgb(209, 249, 245)', color: 'rgb(39, 199, 183)', data: customers.length },
            { title: 'Total Delivery', icon: faTruck, background: 'rgb(248, 218, 194)', color: 'rgb(255, 129, 29)', data: orders.length },
        ];
        return (
            <React.Fragment>
                <Header/>
                <Nav match={this.props.match} />
                <div className="Admin admin-page">
                    <Container>
                        <Row>
                            {
                                statistics.map(statistic =>
                                    <Col xl="3" lg="6" md="6" className="mb-4" key={statistic.title}>
                                        <Statistic
                                            title={statistic.title}
                                            icon={statistic.icon}
                                            color={statistic.color}
                                            background={statistic.background}
                                            data={statistic.data}
                                        />
                                    </Col>
                                )
                            }
                        </Row>
                        <Row>
                            <Col className="mb-4">
                                <Sale revenue={revenue} orders={orders} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order,
        customers: state.customers,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllOrders: () => {
            dispatch(actGetAllOrderRequestAdmin())
        },
        onGetAllCustomers: () => {
            dispatch(actGetAllCustomersRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)