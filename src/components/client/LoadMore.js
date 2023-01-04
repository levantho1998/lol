import React, { Component } from 'react'
import '../../css/client/Loadmore.css'
import { Button } from 'reactstrap'
class LoadMore extends Component {
    render() {
        return (
            <div className="m-0 w-100 d-flex justify-content-center">
                <Button className="load-more mb-3">Load more</Button>
            </div>
        )
    }
}

export default LoadMore