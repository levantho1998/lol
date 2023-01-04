import React, { Component } from 'react'
import { Button, Modal } from 'reactstrap'
import SignIn from './SignIn'
import SignUp from './SignUp'
import User from './User'
import { Link } from 'react-router-dom'
import '../../css/client/Nav.css'
import { connect } from 'react-redux'
import { actOpenFormSignIn, actToggleProfileForm, actLogin, actLogout, actCheckoutClick    } from '../../actions/index'

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
        }
    }

    toggle = () => {
        let modal = this.state.modal
        this.setState({
            modal: !modal
        })
    }

    closeModel = () => {
        this.setState({
            modal: false
        })
    }

    handleOnclick = () => {
        this.props.onCheckoutClick()
        this.props.onOpenFormSignIn()
    }

    render() {
        let { form, onToggleProfileForm, statusProfileForm, onLogin, onLogout, onOpenFormSignIn, modal } = this.props
        // let token = localStorage.getItem('token')

        let user = JSON.parse(localStorage.getItem('user'))
        let token = null
        if (user) {
            token = user.accessToken
        }
        const externalCloseBtn = <button className="auth close" style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#fff', width: '32px', height: '32px', color: 'rgb(34, 34, 34)', borderRadius: '50%', opacity: '1' }} onClick={this.props.onCheckoutClick}>&times;</button>;
        return (
            <div className="Nav">
                <div className="logo">
                    <Link to="/">
                        <img alt="" src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" />
                    </Link>
                </div>
                <div className="user-btn">
                    <Modal isOpen={modal} toggle={this.props.onCheckoutClick} className="modal-dialog modal-dialog-centered" external={externalCloseBtn}>
                        {
                            form === 'signin' ? <SignIn onLogin={onLogin} user={user} onCloseModal={this.props.onCheckoutClick} /> : <SignUp onOpenFormSignIn={onOpenFormSignIn} />
                        }
                    </Modal>
                    {
                        !token ? <Button className="auth-btn" onClick={this.handleOnclick}>Sign in</Button> : <User onToggleProfileForm={onToggleProfileForm} statusProfileForm={statusProfileForm} user={user} onLogout={onLogout} />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        form: state.Form,
        statusProfileForm: state.statusProfileForm,
        user: state.user,
        modal: state.isCheckout
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOpenFormSignIn: () => {
            dispatch(actOpenFormSignIn())
        },
        onToggleProfileForm: () => {
            dispatch(actToggleProfileForm())
        },
        onLogin: (user) => {
            dispatch(actLogin(user))
        },
        onLogout: () => {
            dispatch(actLogout())
        },
        onCheckoutClick: () => {
            dispatch(actCheckoutClick())
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)