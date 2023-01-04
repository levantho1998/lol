import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import UserSideBar from '../../components/client/UserSideBar'
import Nav from '../../components/client/Nav'
import '../../css/client/UserProfile.css'
import { connect } from 'react-redux'
import { actUpdateUserRequest } from '../../actions/index'
class Userprofle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            address: '',
            phone: ''
        }
    }

    componentDidMount() {
        let { user } = this.props
        let name = user.name
        let email = user.email
        let address = user.address
        let phone = user.phone
        this.setState({
            name: name,
            email: email,
            address: address,
            phone: phone
        })
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
        let user = this.state
        this.props.onUpdateUser(user)
    }
    render() {
        let { name, email, address, phone } = this.state
        return (
            <React.Fragment>
                <Nav />
                <div className="UserProfile user-container">
                    {/* <Alert option="edit" isOpen={isSave} /> */}
                    <div>
                        <UserSideBar page="profile" />
                    </div>
                    <div className="profile">
                        <div className="header">
                            <h1>Your Profile</h1>
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="name">
                                    Name
                            <span className="ml-1 text-danger">*</span>
                                </Label>
                                <Input id="name" type="text" name="name" autoComplete="off" value={name} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">
                                    Email
                            <span className="ml-1 text-danger">*</span>
                                </Label>
                                <Input id="email" type="email" name="email" autoComplete="off" value={email} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">
                                    Address
                            <span className="ml-1 text-danger">*</span>
                                </Label>
                                <Input id="address" type="text" name="address" autoComplete="off" value={address} onChange={this.handleChange} />
                                {/* {errors.address && <div className="validation">{errors.address}</div>} */}
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">
                                    Phone
                            <span className="ml-1 text-danger">*</span>
                                </Label>
                                <Input autoComplete="off" id="phone" type="text" name="phone" value={phone} onChange={this.handleChange} />
                                {/* {errors.phone && <div className="validation">{errors.phone}</div>} */}
                            </FormGroup>
                            <Button size="lg" block type="submit">
                                Save
                            </Button>
                        </Form>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateUser: (user) => {
            dispatch(actUpdateUserRequest(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userprofle)