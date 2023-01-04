import React, { Component } from 'react';
import '../../css/admin/CategoryFunc.css'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { connect } from 'react-redux'
// import { actToggleFormCategory } from '../../actions';

class CategoryFunc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            nameErr : ''
        }
    }

    validateFn = (input = '', info = '') => {
        if (!input) {
            return `The ${info} field is required.`
        }
        if (info !== 'price' && info !== 'category') {
            if (input.length < 6) {
                return `${info.charAt(0).toUpperCase() + info.slice(1)} must be at least 5 characters.`
            }
        }

        return '';
    }

    validate = (name) => {
        const nameErr = this.validateFn(name, 'name') || '';
        if (nameErr) {
            this.setState({
                nameErr: nameErr,
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

    handleClick = async (e) => {
        e.preventDefault()
        let {name} = this.state
        let isvalid = this.validate(name)
        console.log(isvalid)
        let data = {
            name : name 
        }
        if(isvalid) {
            this.props.onAddCategory(data)
            this.props.onToggleFormCategory()
        }
    }
    render() {
        let {onToggleFormCategory} = this.props
        let {name,nameErr} = this.state
        return ( 
            <div className="ProductFuncBackground">
                <Container className="ProductFunc">
                    <Row style={{
                        position: "fixed",
                        top: "0",
                        width: "100%",
                        left: "0",
                        right: "0",
                        margin: "0",
                        padding: "50px 35px 0 70px",
                    }}>
                        <Col className="d-flex justify-content-between p-0">
                            <h3
                                className="bt-header mb-5"
                                style={{ fontSize: "18px", color: "rgb(22,31,106)" }}
                            >
                                {/* {this.isEmpty(productEditing) ? 'Add Product' : 'Update Product'} */}
                                Create Category
                            </h3>
                            <FontAwesomeIcon icon={faTimes} onClick={onToggleFormCategory}/>
                        </Col>
                    </Row>
                    <Form style={{ height: '100%', overflow: 'scroll' }}>
                        <Row className="w-100 m-0">
                            <Col xl="4" style={{ padding: "30px" }}>
                                <span className="product-title">
                                    Add your category description and necessary informations from here
                                </span>
                            </Col>
                            <Col className="product-background">
                                <FormGroup className="update-form">
                                    <Label className="product-label" for="name">
                                        Category Name
                                        <span className="ml-1 text-danger">*</span>
                                    </Label>
                                    <Input
                                        autoComplete="off"
                                        className="product-form-control"
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={this.handleChange}
                                        // value={productEditing.name ? productEditing.name : name}
                                        value={name}
                                    />
                                    {nameErr && <div className="validation">{nameErr}</div>}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="update-btn">
                            <Col className="p-0 cancle-btn w-100">
                                <Button className="w-100" onClick={onToggleFormCategory}>Cancel</Button>
                            </Col>
                            <Col className="p-0 submit-btn w-100">
                                <Button className="w-100" type="submit" onClick={this.handleClick}>Create Category</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}



export default CategoryFunc;