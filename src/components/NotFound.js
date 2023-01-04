import React, { Component } from 'react'
import '../css/NotFound.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
class NotFound extends Component {

    render() {
        return (
            <div className="NotFound">
                <div className="wrapper">
                    <h1>Sorry, No result found :(</h1>
                    <img className="w-100" src="https://res.cloudinary.com/dofqucuyy/image/upload/v1586332632/Books/notfound_sufieg.svg" alt="" />

                    {/* // type !== 'admin' &&  */}
                    <button className="btn" onClick={this.props.onGetAllProduct}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                            Go Back
                    </button>

                </div>
            </div>
        );
    }
}

export default NotFound