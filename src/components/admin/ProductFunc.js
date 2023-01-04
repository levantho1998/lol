import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../css/admin/ProductFunc.css";
import callApi from "../../utils/apiCaller";

class ProductFunc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      price: "",
      img: "",
      des: "",
      category: "Children Literature",
      author: "",
      url_img: "",
      // isClick: false,
      nameErr: "",
      priceErr: "",
      desErr: "",
      categoryErr: "",
      authorErr: "",
      err: "",
    };
  }

  validateFn = (input = "", info = "") => {
    if (!input) {
      return `The ${info} field is required.`;
    }
    if (info !== "price" && info !== "category") {
      if (input.length < 6) {
        return `${
          info.charAt(0).toUpperCase() + info.slice(1)
        } must be at least 5 characters.`;
      }
    }

    return "";
  };

  validate = (name, price, des, category, author) => {
    const nameErr = this.validateFn(name, "name") || "";
    const priceErr = this.validateFn(price, "price") || "";
    const desErr = this.validateFn(des, "des") || "";
    const categoryErr = this.validateFn(category, "category") || "";
    const authorErr = this.validateFn(author, "author") || "";
    if (nameErr || priceErr || desErr || categoryErr || authorErr) {
      this.setState({
        nameErr: nameErr,
        priceErr: priceErr,
        desErr: desErr,
        categoryErr: categoryErr,
        authorErr: authorErr,
      });
      return false;
    }
    return true;
  };

  handleClick = () => {
    this.props.onCloseFormProduct();
    this.props.onResetProductUpdate();
  };

  isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleImage = async (e) => {
    let target = e.target;
    // let name = target.name
    let file = target.files[0];
    // console.log(file)
    // console.log(this.state.fileImg)
    const formData = new FormData();
    console.log(formData);
    formData.append(
      "image",
      file,
      file.name
      // this.state.fileImg.name
    );

    const res = await callApi("api/upload/post", "POST", formData);
    // console.log(res.data.url_img)
    if (res) {
      if (this.state.img) {
        this.setState({
          url_img: res.data.url_img,
          img: "",
        });
      }
      this.setState({
        url_img: res.data.url_img,
      });
    }
  };

  handleClickCreateOrUpdateProduct = async (e) => {
    e.preventDefault();
    let { _id, name, price, des, category, author, url_img, img } = this.state;
    let isValidate = this.validate(name, price, des, category, author);
    if (_id) {
      let data = {
        _id: _id,
        name: name,
        price: price,
        des: des,
        category: category,
        author: author,
        img: url_img ? url_img : img,
      };
      if (isValidate) {
        this.props.onUpdateProduct(data); // update product
        this.props.onResetProductUpdate();
      }
    } else {
      let data = {
        name: name,
        price: price,
        des: des,
        category: category,
        author: author,
        img: url_img,
        quantitySold: 0,
      };
      if (isValidate) {
        this.props.onAddProduct(data); // add product
      }
    }
  };

  componentDidMount() {
    let { productEditing } = this.props;
    let isProductEditing = this.isEmpty(productEditing);
    // console.log(productEditing)
    // console.log(isProductEditing)
    if (isProductEditing) {
      this.setState({
        category: "Children Literature",
      });
    } else {
      this.setState({
        _id: productEditing._id,
        name: productEditing.name,
        price: productEditing.price,
        des: productEditing.des,
        img: productEditing.img,
        author: productEditing.author,
        category: productEditing.category,
      });
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //     console.log(nextProps)
  //     console.log(prevState)
  //     const isEmpty = (obj) => {
  //         for (var key in obj) {
  //             if (obj.hasOwnProperty(key))
  //                 return false;
  //         }
  //         return true;
  //     }
  //     let { productEditing } = nextProps
  //     // console.log(productEditing)
  //     if (isEmpty(productEditing)) {
  //         return prevState

  //     }
  //     // if(JSON.stringify(productEditing) !== JSON.stringify(prevState)) {
  //     //     return prevState
  //     // }
  //     // if(!isEmpty(productEditing)) {
  //     //     if(JSON.stringify(productEditing) !== JSON.stringify(prevState)) {
  //     //         return
  //     //     }
  //     // }
  //     else {
  //         return {
  //             _id: productEditing._id,
  //             name: productEditing.name,
  //             price: productEditing.price,
  //             des: productEditing.des,
  //             img: productEditing.img,
  //             author: productEditing.author,
  //             category: productEditing.category
  //         }
  //     }
  // }

  render() {
    let { isOpenFormProduct, productEditing, onCloseFormProduct, isClick } =
      this.props;
    let {
      name,
      price,
      des,
      category,
      author,
      url_img,
      img,
      // isClick,
      nameErr,
      priceErr,
      desErr,
      categoryErr,
      authorErr,
    } = this.state;
    const categoryList = [
      { name: "Children Literature" },
      { name: "Comic Book" },
      { name: "Fantasy" },
      { name: "Horror" },
      { name: "Novel" },
      { name: "Romantic" },
      { name: "Science Fiction" },
      { name: "Thriller" },
    ];
    return (
      <div
        className={
          isOpenFormProduct
            ? "ProductFuncBackground update-active"
            : "ProductFuncBackground"
        }
      >
        <Container
          className={
            isOpenFormProduct ? "ProductFunc update-active" : "ProductFunc"
          }
        >
          <Row
            style={{
              position: "fixed",
              top: "0",
              width: "100%",
              left: "0",
              right: "0",
              margin: "0",
              padding: "50px 35px 0 70px",
            }}
          >
            <Col className="d-flex justify-content-between p-0">
              <h3
                className="bt-header mb-5"
                style={{ fontSize: "18px", color: "rgb(22,31,106)" }}
              >
                {this.isEmpty(productEditing)
                  ? "Add Product"
                  : "Update Product"}
              </h3>
              <FontAwesomeIcon icon={faTimes} onClick={this.handleClick} />
            </Col>
          </Row>
          <Form style={{ height: "100%", overflow: "scroll" }}>
            <Row className="mb-5 w-100 m-0">
              <Col xl="4" style={{ padding: "30px" }}>
                <span className="product-title">
                  Upload your Product image here
                </span>
              </Col>
              <Col xl="8" className="product-background">
                <FormGroup>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    name="fileImg"
                    onChange={this.handleImage}
                  />
                  <Label for="file" className="input-wrapper">
                    <FontAwesomeIcon icon={faCloudUploadAlt} size="2x" />
                    <span>
                      <span>Drag/Upload </span>
                      your image here.
                    </span>
                  </Label>
                  {img && (
                    <div className="img-wrapper">
                      <img src={productEditing.img} alt="" />
                    </div>
                  )}
                  {url_img && (
                    <div className="img-wrapper">
                      <img src={url_img} alt="" />
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row className="w-100 m-0">
              <Col xl="4" style={{ padding: "30px" }}>
                <span className="product-title">
                  Add your Product description and necessary information from
                  here
                </span>
              </Col>
              <Col className="product-background">
                <FormGroup className="update-form">
                  <Label className="product-label" for="name">
                    Name
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

                <FormGroup className="update-form">
                  <Label className="product-label" for="description">
                    Description
                    <span className="ml-1 text-danger">*</span>
                  </Label>
                  <div>
                    <textarea
                      // value={productEditing.des ? productEditing.des : des}
                      value={des}
                      className="product-form-control"
                      id="description"
                      type="text"
                      name="des"
                      onChange={this.handleChange}
                      autoComplete="off"
                    />
                  </div>
                  {desErr && <div className="validation">{desErr}</div>}
                </FormGroup>

                <FormGroup className="update-form">
                  <Label className="product-label" for="price">
                    Price
                    <span className="ml-1 text-danger">*</span>
                  </Label>
                  <Input
                    autoComplete="off"
                    className="product-form-control"
                    id="price"
                    type="number"
                    name="price"
                    onChange={this.handleChange}
                    // value={productEditing.price ? productEditing.price : price}
                    value={price}
                  />
                  {priceErr && <div className="validation">{priceErr}</div>}
                </FormGroup>

                <FormGroup className="update-form">
                  <Label className="product-label" for="author">
                    Author
                    <span className="ml-1 text-danger">*</span>
                  </Label>
                  <Input
                    autoComplete="off"
                    className="product-form-control"
                    id="author"
                    type="text"
                    name="author"
                    onChange={this.handleChange}
                    // value={productEditing.author ? productEditing.author : author}
                    value={author}
                  />
                  {authorErr && <div className="validation">{authorErr}</div>}
                </FormGroup>

                <FormGroup className="update-form">
                  <Label className="product-label" for="category">
                    Category
                    <span className="ml-1 text-danger">*</span>
                  </Label>
                  <Input
                    autoComplete="off"
                    className="product-form-control"
                    id="category"
                    type="select"
                    name="category"
                    onChange={this.handleChange}
                    value={category}
                    // value={productEditing.category ? productEditing.category : category}
                  >
                    {this.props.category.map((category) => (
                      <option key={category.name}>{category.name}</option>
                    ))}
                  </Input>
                  {categoryErr && (
                    <div className="validation">{categoryErr}</div>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row className="update-btn">
              <Col className="p-0 cancle-btn w-100">
                <Button className="w-100" onClick={onCloseFormProduct}>
                  Cancel
                </Button>
              </Col>
              <Col className="p-0 submit-btn w-100">
                <Button
                  className="w-100"
                  type="submit"
                  onClick={this.handleClickCreateOrUpdateProduct}
                >
                  {this.isEmpty(productEditing)
                    ? "Create Product"
                    : "Update Product"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default ProductFunc;
