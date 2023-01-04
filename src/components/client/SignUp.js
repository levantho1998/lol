import React, { Component } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import '../../css/client/Authform.css'
import callAPI from '../../utils/apiCaller'
const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            phone: '',
            nameErr: '',
            emailErr: '',
            passwordErr: '',
            addressErr: '',
            phoneErr: '',
            err: ''
        }
    }

    validateFn(input = '', info = '') {
        if (info === 'phone') {
            if (!input) {
                return `The ${info} field is required.`
            }
            if (input.length < 10) {
                return `${info.charAt(0).toUpperCase() + info.slice(1)} must be at least 10 characters.`
            }
        }
        if (info === 'email') {

            if (!input) {
                return `The ${info} field is required.`
            }
            let isValidEmail = REGEX_EMAIL.test(input)
            if (!isValidEmail) {
                return 'Invalid email'
            }
        }
        else {
            if (!input) {
                return `The ${info} field is required.`
            }
            if (input.length < 6) {
                return `${info.charAt(0).toUpperCase() + info.slice(1)} must be at least 6 characters.`

            }
            return '';
        }
    }

    validate = (name, email, password, address, phone) => {
        const nameError = this.validateFn(name, 'name') || '';
        const emailError = this.validateFn(email, 'email') || '';
        const passwordError = this.validateFn(password, 'password') || '';
        const addressError = this.validateFn(address, 'address') || '';
        const phoneError = this.validateFn(phone, 'phone') || '';
        if (nameError || emailError || passwordError || addressError || phoneError) {
            this.setState({
                nameErr: nameError,
                emailErr: emailError,
                passwordErr: passwordError,
                addressErr: addressError,
                phoneErr: phoneError
            })
            return false
        }
        return true
    }

    handleChange = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let { name, email, password, address, phone } = this.state
        let isValidate = this.validate(name, email, password, address, phone)
        let userInfo = {
            name,
            email,
            password,
            address,
            phone
        }
        if (isValidate) {
            callAPI('api/auth/sign-up', 'POST', userInfo).then(() => {
                this.props.onOpenFormSignIn()
            }).catch(error => this.setState({
                err: error.response.data.message
            }))
        }
    }
    render() {
        let {
            name,
            email,
            password,
            address,
            phone,
            nameErr,
            emailErr,
            passwordErr,
            addressErr,
            phoneErr,
            err
        } = this.state
        return (
            <div className="Authform">
                <div className="header">
                    <h1>Sign Up</h1>
                    <p>By signing up, you agree to Pickbazar's</p>
                </div>
                {err && <div style={{
                    color: "rgb(97, 26, 21)",
                    backgroundColor: "rgb(253, 236, 234)",
                    textAlign: "center",
                    padding: "15px",
                    borderRadius: "4px"
                }}>{err}</div>}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">
                            Name
                            <span className="ml-1 text-danger">*</span>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            autoComplete="off"
                            value={name}
                            onChange={this.handleChange}
                        />
                        {nameErr && <div className="validation">{nameErr}</div>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Email
                            <span className="ml-1 text-danger">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={email}
                            onChange={this.handleChange}
                        />
                        {emailErr && <div className="validation">{emailErr}</div>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Password
                            <span className="ml-1 text-danger">*</span>
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="off"
                            value={password}
                            onChange={this.handleChange}
                        />
                        {passwordErr && <div className="validation">{passwordErr}</div>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">
                            Address
                            <span className="ml-1 text-danger">*</span>
                        </Label>
                        <Input
                            id="address"
                            type="text"
                            name="address"
                            autoComplete="off"
                            value={address}
                            onChange={this.handleChange}
                        />
                        {addressErr && <div className="validation">{addressErr}</div>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">
                            Phone
                            <span className="ml-1 text-danger">*</span>
                        </Label>
                        <Input
                            autoComplete="off"
                            id="phone"
                            type="number"
                            name="phone"
                            value={phone}
                            onChange={this.handleChange}
                        />
                        {phoneErr && <div className="validation">{phoneErr}</div>}
                    </FormGroup>
                    <Button size="lg" block type="submit">
                        Continue
                    </Button>
                </Form>
                <div className="footer">
                    Already have an account?
                    &nbsp;<span className="signin" onClick={this.props.onOpenFormSignIn}>Sign In</span>
                </div>
            </div>
        )
    }
}

export default SignUp