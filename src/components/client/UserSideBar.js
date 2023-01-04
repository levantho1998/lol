import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../css/client/UserSideBar.css'
class UserSideBar extends Component {

    render() {
        return (
            <div className="user-side-bar d-none d-xl-block">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="order">
                            Your order
                        </Link>
                    </li>
                    <li className="nav-item mb-5">
                        <Link to="/checkout">
                            Checkout
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="profile">
                            Your Account Settings
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#">
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default UserSideBar