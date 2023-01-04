import React, { Component } from 'react'
import Burger from '../Burger'
import { Link } from 'react-router-dom'
import '../../css/client/User.css'
class User extends Component {
    render() {
        let { onToggleProfileForm, statusProfileForm, user, onLogout } = this.props
        return (
            <div className="User h-100">
                <div className="welcome" onClick={onToggleProfileForm}>
                    Hello {user.name}
                    <Burger statusProfileForm={statusProfileForm} />
                </div>
                <ul className={statusProfileForm ? "nav-links nav-active" : "nav-links"}>
                    <li className={statusProfileForm ? "item-active" : "item"}>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className={statusProfileForm ? "item-active" : "item"}>
                        <Link to="/checkout">Checkout</Link>
                    </li>
                    <li className={statusProfileForm ? "item-active" : "item"}>
                        <Link to="/order">My Orders</Link>
                    </li>
                    <li className={statusProfileForm ? "item-active" : "item"}>
                        <Link to="#" onClick={onLogout}>Logout</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default User