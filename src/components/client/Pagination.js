import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Pagination extends Component {

    showPageNumbers = (pageNumbers) => {
        let result = null
        result = pageNumbers.map((number, index) =>
            <li key={index} className="page-item">
                <Link to="#" className="page-link" onClick={() => this.props.paginate(number)}>{number}</Link>
            </li>
        )
        return result
    }
    render() {
        let { perPage, totalProducts } = this.props
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(totalProducts / perPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <ul className="pagination">
                {this.showPageNumbers(pageNumbers)}
            </ul>
        )
    }
}

export default Pagination