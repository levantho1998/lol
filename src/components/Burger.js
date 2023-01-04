import React, { Component } from 'react'
import '../css/Burger.css'
class Burger extends Component {

    render() {
        let { statusProfileForm } = this.props
        return (
            <div
                className={statusProfileForm ? "Burger toggle" : "Burger"}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0",
                    height: "auto",
                    marginLeft: "5px"
                }}
            >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        )
    }
}

export default Burger