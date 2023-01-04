import React, { Component } from 'react';
import '../../css/admin/ButtonAddCategory.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
class ButtonAddCategory extends Component {
    render() {
        return (
            <div className="add-products-btn" onClick={this.props.onToggleFormCategory}>
                <FontAwesomeIcon icon={faPlus} className="mr-2"/>
                Add Category
            </div>
        );
    }
}

export default ButtonAddCategory;