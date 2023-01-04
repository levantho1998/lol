import React, { Component } from 'react'
import {
    Form,
    FormGroup,
    Input,
    Label,
    Button
} from 'reactstrap';
import { Redirect } from 'react-router-dom'
import '../../css/admin/AdminLogin.css'
import callApi from '../../utils/apiCaller'

class AdminLogin extends Component {
    constructor(pros) {
        super(pros)
        this.state = {
            username: '',
            password: '',
            emailErr: '',
            passwordErr: '',
            err: '',
            isLogin: false
        }
    }

    validate = (usename, password) => {
        let usernameError = '';
        let passwordError = '';

        if (!usename) {
            usernameError = 'The Username field is required.'
        }
        if (!password) {
            passwordError = 'The Password field is required.'
        }

        if (usernameError || passwordError) {
            this.setState({
                usernameError: usernameError,
                passwordErr: passwordError
            })
            return false;
        }
        return true;
    }

    onHandleChange = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        let { username, password } = this.state
        let isValidate = this.validate(username, password)
        if (isValidate) {
            let account = {
                username,
                password
            }
            // // this.props.onLogin(account)
            // callApi('api/auth/sign-in', 'POST', account).then(res => {
            //     this.props.onLogin(res.data) // res.data = user
            //     this.props.onCloseModal()

            // }).catch(error => this.setState({
            //     err: error.response.data.message
            // }))
            const res = await callApi('api/admin/sign-in', 'POST', account)
            if (res) {
                let admin = res.data
                let adminToken = admin.accessToken
                localStorage.setItem('adminToken', adminToken)
                this.setState({
                    isLogin: true
                })
            }
        }
    }

    render() {
        if (this.state.isLogin) {
            return <Redirect to="/admin/products" />
        }
        let { email, password, usernameError, passwordErr, err } = this.state
        return (
            <div className="AdminLogin">
                <div className="Authform">
                    <div className='header'>
                        <img src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" alt="" />
                        <p>Login to Admin</p>
                    </div>
                    {err && <div style={{
                        color: "rgb(97, 26, 21)",
                        backgroundColor: "rgb(253, 236, 234)",
                        textAlign: "center",
                        padding: "15px",
                        borderRadius: "4px"
                    }}>{err}</div>}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="Username">Username</Label>
                            <Input type="text" name="username" id="Username" placeholder="EX: admin123" value={email} onChange={this.onHandleChange} />
                            {usernameError && <div className="validation">{usernameError}</div>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input type="password" name="password" id="Password" placeholder="EX: admin123" value={password} onChange={this.onHandleChange} />
                            {passwordErr && <div className="validation">{passwordErr}</div>}
                        </FormGroup>
                        <Button size="lg" block type="submit" className="btn">Continue</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AdminLogin