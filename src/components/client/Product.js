import React, { Component } from "react";
import { Col } from "reactstrap";
import "../../css/client/Product.css";
import CartBtn from "./CartBtn";
import ButtonDelete from "../admin/ButtonDelete";
import { Link } from "react-router-dom";

class Product extends Component {
  handleClick = () => {
    let { product } = this.props;
    this.props.onGetProductUpdate(product);
    this.props.onOpenFormProduct();
  };

  render() {
    let {
      type,
      product,
      cart,
      onAddToCart,
      onCartBtnClick,
      onDecreaseCart,
      deleteProduct,
    } = this.props;
    return (
      <Col className="mb-5" sm="6" lg="4" xl="3">
        <Link
          className="product"
          to={type === "admin" ? "/admin/products" : `/product/${product._id}`}
        >
          <img
            src={product.img}
            alt="this is image"
            onClick={type === "admin" ? this.handleClick : null}
          />
          <div className="info">
            <h3 className="title">{product.name}</h3>
            <p className="author">{product.author}</p>
            <p className="author">Sold : {product.quantitySold ?? 0}</p>
          </div>
          {(type === "related" || type === "admin") && (
            <div className="cartbtn-price">
              <div className="price">${product.price}</div>
              {type !== "admin" && (
                <CartBtn
                  type={type}
                  cart={cart}
                  product={product}
                  onAddToCart={onAddToCart}
                  onCartBtnClick={onCartBtnClick}
                  onDecreaseCart={onDecreaseCart}
                />
              )}
              {type == "admin" && (
                <ButtonDelete deleteProduct={deleteProduct} product={product} />
              )}
            </div>
          )}
        </Link>
      </Col>
    );
  }
}

export default Product;
