import React, { Component } from 'react'
import '../css/Alert.css'
import { connect } from 'react-redux'
class Alert extends Component {

    renderAlert = (statusAlert) => {
        switch (statusAlert.option) {
            case 'login':
                return <div className={statusAlert.isAlertOpen ? "bt-alert alert-active" : "bt-alert"}>Welcome Back!</div>;
            case 'edit':
                return <div className={statusAlert.isOpen ? "bt-alert alert-active" : "bt-alert"}>Save Successfully!</div>
            // case 'admin':
            //     return <div className={"bt-alert"}>Successfully!</div>
            default:
                return;
        }
    }

    render() {
        let { statusAlert } = this.props
        console.log(statusAlert)
        return (
            <div className="Alert">{this.renderAlert(statusAlert)}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        statusAlert: state.statusAlert
    }
}

export default connect(mapStateToProps, null)(Alert)