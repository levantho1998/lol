import React, { Component } from 'react'


import Nav from './Nav'
import Banner from './Banner'
class Header extends Component {

    render() {
        let { onFindProduct } = this.props
        return (
            <header>
                {/* Nav  */}
                <Nav />
                {/* slider  */}
                <Banner onFindProduct={onFindProduct} />
            </header>
        )
    }
}

export default Header