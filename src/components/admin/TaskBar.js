import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import Filter from '../../components/admin/Filter'
import Search from '../../components/admin/Search'
import '../../css/admin/TaskBar.css'
import ButtonAddCategory from './ButtonAddCategory'

class TaskBar extends Component {

    handleChange = (e) => {

    }

    showTaskBar = (option) => {

    }

    render() {
        let {
            type,
            onFilterProducts,
            onFindProduct,
            onFilterProductsByName,
            getKeyword,
            keyword,
            category,
            price,
            getFilter,
            onFilterOrders,
            getKeywordOrders,
            getFilterOrders,
            payment,
            amount,
            keyword_email,
            onFilterCustomers,
            onToggleFormCategory,
            onFilterCategory
        } = this.props
        switch (type) {
            case "Customers":
                return (
                    <Row className="TaskBar">
                        <React.Fragment>
                            <Col xl="2" className="mb-4 mb-xl-0">
                                <h3 className="title">{type ? type : 'Products'}</h3>
                            </Col>
                            <Search type={type} onFindProduct={onFindProduct} onFilterCustomers={onFilterCustomers} />
                            {/* <Filter type={type} onFilterProducts={onFilterProducts} /> */}
                        </React.Fragment>
                    </Row>
                )
            case "Orders":
                return (
                    <Row className="TaskBar">
                        <React.Fragment>
                            <Col xl="2" className="mb-4 mb-xl-0">
                                <h3 className="title">{type ? type : 'Products'}</h3>
                            </Col>
                            <Filter
                                type={type}
                                onFilterOrders={onFilterOrders}
                                getFilterOrders={getFilterOrders}
                                keyword_email={keyword_email}
                            />
                            <Search
                                type={type}
                                onFilterOrders={onFilterOrders}
                                getKeywordOrders={getKeywordOrders}
                                payment={payment}
                                amount={amount}
                            />
                        </React.Fragment>
                    </Row>
                )
            case "Category":
                return (
                    <Row className="TaskBar">
                        <React.Fragment>
                            <Col xl="2" className="mb-4 mb-xl-0">
                                <h3 className="title">{type ? type : 'Products'}</h3>
                            </Col>
                            <Search type={type} onFilterCategory={onFilterCategory} />
                            {/* <Filter type={type} onFilterProducts={onFilterProducts} /> */}
                            <ButtonAddCategory onToggleFormCategory={onToggleFormCategory}/>
                        </React.Fragment>
                    </Row>
                )  
            default:
                return (
                    <Row className="TaskBar">
                        <React.Fragment>
                            <Col xl="2" className="mb-4 mb-xl-0">
                                <h3 className="title">{type ? type : 'Products'}</h3>
                            </Col>
                            <Filter
                                type={type}
                                onFilterProducts={onFilterProducts}
                                keyword={keyword}
                                getFilter={getFilter}
                                category={category}
                            />
                            <Search
                                type={type}
                                onFilterProductsByName={onFilterProductsByName}
                                onFilterProducts={onFilterProducts}
                                getKeyword={getKeyword}
                                category={category}
                                price={price}
                            />
                        </React.Fragment>
                    </Row>
                )
        }
    }
}

export default TaskBar