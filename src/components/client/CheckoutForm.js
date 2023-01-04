import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../../css/client/CheckoutForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faMoneyBillAlt,
} from "@fortawesome/free-solid-svg-icons";
import { CardElement } from "@stripe/react-stripe-js";
import { Redirect } from "react-router-dom";
import callApi from "../../utils/apiCaller";
import axios from "axios";

class CheckoutForm extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      id: "",
      name: "",
      email: "",
      address: "",
      phone: "",
      payment: "",
      date: "",
      totalPrice: "",
      cartItem: "",
      redirect: false,
      error: "",
    };
  }

  totalPrice = (cart) => {
    let totalPrice = null;
    cart.forEach((element) => {
      totalPrice += element.product.price * element.quantity;
    });
    return totalPrice;
  };

  componentDidMount() {
    let today = new Date();
    let date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    let totalPrice = this.totalPrice(this.props.cart);
    let cart = this.props.cart;
    let { name, email, address, phone } = this.props.user;
    this.setState({
      name: name,
      email: email,
      address: address,
      phone: phone,
      date: date,
      totalPrice: totalPrice,
      cartItem: cart,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    let order = { ...this.state };
    delete order.redirect;
    delete order.id;
    delete order.error;
    // this.props.onCreateOrder(order)

    console.log(1111, order);

    if (order.payment === "cash") {
      let res = await callApi("api/order", "POST", order);
      callApi("api/product/updateQuantity", "PUT", order.cartItem);
      console.log(res.data);
      let id = res.data._id;
      this.props.onCreateOrder(res.data);
      this.props.onRemoveAllCart();
      localStorage.removeItem("cart");
      this.props.onCloseCartItem();
      this.setState({
        id: id,
        redirect: true,
      });
    }

    if (order.payment === "card") {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      if (!error) {
        // console.log(paymentMethod)
        // const { id } = paymentMethod
        // const { data } = await axios.post('http://localhost:9000/api/charge', { id, amount: order.totalPrice * 100, order })
        // console.log(data)
        // if (data) {
        //     let res = await callApi('api/order', 'POST', order)
        //     let id = res.data._id
        //     this.props.onCreateOrder(res.data)
        //     this.setState({
        //         id: id,
        //         redirect: true
        //     })
        // }
        // else {
        //     this.setState({
        //         error: true
        //     })
        // }
        try {
          const { id } = paymentMethod;
          await axios.post("http://localhost:9000/api/charge", {
            id,
            amount: order.totalPrice * 100,
            order,
          });
          let res = await callApi("api/order", "POST", order);
          callApi("api/product/updateQuantity", "PUT", order.cartItem);
          let id_neworder = res.data._id;
          this.props.onCreateOrder(res.data);
          this.props.onRemoveAllCart();
          localStorage.removeItem("cart");
          this.props.onCloseCartItem();
          this.setState({
            id: id_neworder,
            redirect: true,
          });
        } catch (error) {
          console.log(error);
          this.setState({
            error: error.response.data.message,
          });
        }
      }
    }
  };

  onHandleInput = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
    // console.log(this.state)
  };

  totalQuantity = (cart) => {
    let totalQuantity = null;
    cart.forEach((element) => {
      totalQuantity += element.quantity;
    });
    return totalQuantity;
  };
  totalPrice = (cart) => {
    let totalPrice = null;
    cart.forEach((element) => {
      totalPrice += element.product.price * element.quantity;
    });
    return totalPrice;
  };

  render() {
    const { stripe } = this.props;
    let { payment, redirect, id, error } = this.state;
    let { user, cart } = this.props;
    // console.log(user)
    // console.log(this.state)
    if (redirect === true) {
      return <Redirect to={`/order-received/${id}`} />;
    }
    return (
      <div className="checkout-form">
        <div className="order-info">
          <h3>Your order</h3>
          <div className="item">
            <div className="title">Sub Total({this.totalQuantity(cart)})</div>
            <div className="price">${this.totalPrice(cart)}</div>
          </div>
          <div className="item">
            <div className="title">Shipping Free</div>
            <div className="price">$0.00</div>
          </div>
          <div className="item">
            <div className="title">Total</div>
            <div className="price">${this.totalPrice(cart)}</div>
          </div>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <div className="billing-address">
            <h3 className="bt-header">Billing Address</h3>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="text"
                id="name"
                autoComplete="off"
                value={user.name}
                onChange={this.onHandleInput}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={this.onHandleInput}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={user.address}
                onChange={this.onHandleInput}
              />
            </FormGroup>
            {/* <FormGroup>
                            <Label for="city">City</Label>
                            <Input type="select" name="select" id="city" value={city}>
                                <option>Tỉnh/Thành Phố</option>
                                <option>Hà Nội</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="district">District</Label>
                            <Input type="select" name="select" id="distric" value={district}>
                                <option>Quận/Huyện</option>
                                <option>Hai Bà Trưng</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup> */}
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                value={user.phone}
                onChange={this.onHandleInput}
              />
            </FormGroup>
          </div>
          <div className="payment">
            <h3 className="bt-header">Select Payment Option</h3>
            <FormGroup className="d-flex justify-content-between mb-3 p-0">
              <Input
                type="radio"
                id="cash"
                name="payment"
                value="cash"
                onChange={this.onHandleInput}
                autoComplete="off"
              />{" "}
              <Label for="cash" check>
                <FontAwesomeIcon icon={faMoneyBillAlt} />
                <span>Cash</span>
              </Label>
              <Input
                type="radio"
                id="card"
                name="payment"
                value="card"
                onChange={this.onHandleInput}
                autoComplete="off"
              />{" "}
              <Label for="card" check>
                <FontAwesomeIcon icon={faCreditCard} />
                <span>Card</span>
              </Label>
            </FormGroup>
          </div>
          {payment === "card" && <CardElement />}
          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "5px" }}>
              {error}
            </p>
          )}
          <Button type="submit" className="btn w-100" disabled={!stripe}>
            Proceed to Checkout
          </Button>
        </Form>
      </div>
    );
  }
}

export default CheckoutForm;
