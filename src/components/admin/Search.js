import React, { Component } from 'react'
import { Col, Form, FormGroup, Input } from 'reactstrap'


class Search extends Component {
    constructor(pros) {
        super(pros)
        this.state = {
            keyword_product: '',
            keyword_order: '',
            keyword_customer: '',
            keyword_category : ''
        }
    }

    handleChangeProducts = (e) => {
        let { category, price } = this.props
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
        if (name === 'keyword_product') {
            if (value) {
                this.props.onFilterProducts(value, category, price)
            }
            else {
                this.props.onFilterProducts('', category, price)
            }
        }
        this.props.getKeyword(value)
    }

    handleChangeOrders = (e) => {
        let { payment, amount } = this.props
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
        console.log(payment, amount)
        this.props.onFilterOrders(payment, amount, value)
        this.props.getKeywordOrders(value)
    }

    handleChangeCustomers = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
        this.props.onFilterCustomers(value)
    }

    handleChangeCategory = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
        this.props.onFilterCategory(value)
    }

    handleSubmit = (e) => {
        // let { keyword_product, keyword_customer, keyword_order } = this.state
        e.preventDefault()
        // this.props.onFindProduct(keyword_product)

    }

    handleClick = () => {
        this.setState({
            keyword_product: '',
            keyword_order: '',
            keyword_customer: ''
        })
    }

    render() {
        let { keyword_product, keyword_customer, keyword_order,keyword_category } = this.state
        let { type} = this.props
        switch (type) {
            case "Orders":
                return (
                    <Col xl="4" className="Search">
                        <Form className="h-100" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input
                                    value={keyword_order}
                                    onChange={this.handleChangeOrders}
                                    name="keyword_order"
                                    placeholder="Ex: Search By Email"
                                />
                                {/* {
                                    keyword_order &&
                                    <FontAwesomeIcon
                                        icon={faTimesCircle}
                                        style={{ cursor: "pointer" }}
                                        onClick={this.handleClick}
                                    />
                                } */}
                            </FormGroup>
                        </Form>
                    </Col>
                )
            case "Customers":
                return (
                    <Col xl="6  " className="Search" style={{ maxWidth: "none" }}>
                        <Form className="h-100" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input
                                    value={keyword_customer}
                                    onChange={this.handleChangeCustomers}
                                    name="keyword_customer"
                                    placeholder="Ex: Search By Name"
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                )
            case "Category":
                return (
                    <Col xl="6  " className="Search" style={{ maxWidth: "none" }}>
                        <Form className="h-100" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input
                                    value={keyword_category}
                                    onChange={this.handleChangeCategory}
                                    name="keyword_category"
                                    placeholder="Ex: Search By Name"
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                )
            default:
                return (
                    <Col xl="4" className="Search">
                        <Form className="h-100" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input
                                    value={keyword_product}
                                    onChange={this.handleChangeProducts}
                                    name="keyword_product"
                                    placeholder="Ex: Search By Name"
                                />
                                {/* {
                                    keyword_product &&
                                    <FontAwesomeIcon
                                        icon={faTimesCircle}
                                        style={{ cursor: "pointer" }}
                                        onClick={this.handleClick}
                                    />
                                } */}
                            </FormGroup>
                        </Form>
                    </Col>
                )
        }

    }
}

export default Search