
import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class ButtonDelete extends Component {
    render() {
        let {deleteProduct,product,onDeleteCategory,id,type} = this.props
        switch(type) {
            case 'category':
                return (
                    <div className="cart-btn">
                        <Button className="btn related" onClick={() => onDeleteCategory(id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            <p>Delete</p>
                        </Button>
                    </div>
                )
            default:
                return (
                    <div className="cart-btn">
                        <Button className="btn related" onClick={() => deleteProduct(product)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            <p>Delete</p>
                        </Button>
                    </div>
                )
        }
        
    }
}

export default ButtonDelete