import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Pagination from '../../components/client/Pagination'
import TaskBar from '../../components/admin/TaskBar'

import '../../css/admin/Main.css'
class Main extends Component {
    constructor(pros) {
        super(pros)
        this.state = {
            keyword: '',
            category: '',
            price: ''
        }
    }

    getKeyword = (keyword) => {
        this.setState({
            keyword: keyword,

        })
    }

    getFilter = (category, priceType) => {
        this.setState({
            category: category,
            price: priceType
        })
    }

    render() {
        let {
            products,
            perPage,
            totalProducts,
            paginate,
            onFilterProducts,
            onFindProduct,
            onFilterProductsByName,
            category
        } = this.props
        return (
            <div className="AdminProducts admin-page">
                <Container>
                    <Row style={{ padding: "0 15px" }}>
                        <Col className="admin-col mb-4 pb-0">
                            <TaskBar
                                onFilterProducts={onFilterProducts}
                                onFindProduct={onFindProduct}
                                onFilterProductsByName={onFilterProductsByName}
                                getKeyword={this.getKeyword}
                                keyword={this.state.keyword}
                                getFilter={this.getFilter}
                                category={this.state.category}
                                price={this.state.price}
                                category={category}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {this.props.showProducts(products)}
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                        <Pagination perPage={perPage} totalProducts={totalProducts} paginate={paginate} />
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Main