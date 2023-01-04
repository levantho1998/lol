import React, { Component } from 'react'
import { Col } from 'reactstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThLarge } from "@fortawesome/free-solid-svg-icons"
import '../../css/client/Category.css'

class Category extends Component { 
    render() {
        let { onFilterProducts, paginate,category } = this.props
        console.log(category)
        return (
            <Col lg="3" xl="2">
                <div className="category">
                    <div className="logo">
                        <FontAwesomeIcon icon={faThLarge} className="mr-2" />
                        Select your Category
                    </div>
                    <ul>
                        {/* <li onClick={(e) => { onFilterProducts('Children Literature'); paginate(1) }}>
                            <p>Children Literature</p>
                        </li>
                        <li onClick={() => { onFilterProducts('Comic Book'); paginate(1) }}>
                            <p>Comic Book</p>
                        </li>
                        <li onClick={() => { onFilterProducts('Fantasy'); paginate(1) }}>
                            <p>Fantasy</p>
                        </li>
                        <li onClick={() => { onFilterProducts('Horror'); paginate(1) }}>
                            <p>Horror</p>
                        </li>
                        <li onClick={() => { onFilterProducts('Novel'); paginate(1) }}>
                            <p>Novel</p>
                        </li>
                        <li onClick={() => { onFilterProducts('Romantic'); paginate(1) }}>
                            <p>Romantic</p>
                        </li>
                        <li onClick={() => { onFilterProducts('Science Fiction'); paginate(1) }}>
                            <p>Science Fiction</p>
                        </li>
                        <li onClick={() => { onFilterProducts('Thriller'); paginate(1) }}>
                            <p>Thriller</p>
                        </li> */}
                        {
                            category.map(item => 
                                <li key={item._id} onClick={() => { onFilterProducts(item.name); paginate(1) }}>
                                    <p>{item.name}</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </Col>
        )
    }
}

export default Category