import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../css/admin/Header.css'
class Header extends Component {

    render() {
        let { onOpenFormProduct } = this.props
        return (
            <div className="NavAdmin">
                <div className="logo">
                    <Link to="/">
                        <img src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" alt="" />
                    </Link>
                </div>
                <div className="add-products-btn" onClick={onOpenFormProduct}>
                    Add Products
                </div>
            </div>
        )
    }
}

export default Header