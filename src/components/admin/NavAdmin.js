import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSignOutAlt,
    faThLarge,
    faShoppingBasket,
    faCalendarCheck,
    faUsers,
    faDiceD6
} from "@fortawesome/free-solid-svg-icons";
import '../../css/admin/NavAdmin.css'

class Nav extends Component {

    handleClick = () => {
        localStorage.removeItem('adminToken')
    }

    showLinkItem = (nav) => {

        let result = null
        result = nav.map((item, index) =>
            <li key={index} >
                <Link to={item.path} >
                    <FontAwesomeIcon icon={item.icon} />
                    {item.text}
                </Link>
            </li>
        )
        return result
    }

    render() {
        let path = this.props.match.match.path
        // const nav = [
        //     { icon: faThLarge, text: 'Dashboard', path: '/admin' },
        //     { icon: faShoppingBasket, text: 'Products', path: '/admin/products' },
        //     { icon: faCalendarCheck, text: 'Orders', path: '/admin/orders' },
        //     { icon: faUsers, text: 'Customers', path: '/admin/customers' },
        //     { icon: faSignOutAlt, text: 'Logout', path: '/admin/login' }
        // ];
        return (
            <ul className="navs">
                {/* {this.showLinkItem(nav)} */}
                <li >
                    <Link to="/admin" className={path === '/admin' ? 'link-active' : ''} >
                        <FontAwesomeIcon icon={faThLarge} />
                        Dashboard
                    </Link>
                </li>
                <li >
                    <Link to="/admin/products" className={path === '/admin/products' ? 'link-active' : ''} >
                        <FontAwesomeIcon icon={faShoppingBasket} />
                        Products
                    </Link>
                </li>
                <li >
                    <Link to="/admin/category" className={path === '/admin/category' ? 'link-active' : ''}>
                        <FontAwesomeIcon icon={faDiceD6} />
                        Category
                    </Link>
                </li>
                <li >
                    <Link to="/admin/orders" className={path === '/admin/orders' ? 'link-active' : ''} >
                        <FontAwesomeIcon icon={faCalendarCheck} />
                        Orders
                    </Link>
                </li>
                <li >
                    <Link to="/admin/customers" className={path === '/admin/customers' ? 'link-active' : ''} >
                        <FontAwesomeIcon icon={faUsers} />
                        Customers
                    </Link>
                </li>
                <li >
                    <Link to="/admin/login" className={path === '/admin' ? 'link-active' : ''} onClick={this.handleClick}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Logout
                    </Link>
                </li>
            </ul>
        )
    }
}

export default Nav
