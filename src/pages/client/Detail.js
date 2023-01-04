import React, { Component } from "react";
import Nav from "../../components/client/Nav";
import Cart from "../../components/client/Cart";
import CartItem from "../../components/client/CartItem";
import ProductView from "../../components/client/ProductView";
import RelateItems from "../../components/client/RelateItems";
import HotProducts from "../../components/client/HotProducts";

import Product from "../../components/client/Product";
// import Alert from '../../components/Alert'
import { connect } from "react-redux";
import {
  actGetAllProduct,
  actAddToCart,
  actCartBtnClick,
  actDecreaseCart,
  actDeleteCart,
} from "../../actions/index";
class Detail extends Component {
  showProduct = (products, id) => {
    let product = products.find((product) => product._id === id);
    let category = product?.category;
    let relateitems = products.filter(
      (product) => product.category === category
    );
    let result = null;
    if (relateitems.length > 0) {
      result = relateitems.map((product, index) => {
        return (
          <Product
            key={index}
            product={product}
            type="related"
            cart={this.props.cart}
            onAddToCart={this.props.onAddToCart}
            onCartBtnClick={this.props.onCartBtnClick}
            onDecreaseCart={this.props.onDecreaseCart}
          />
        );
      });
    }
    return result;
  };

  showHotProd = (hotProd) => {
    let result = null;
    if (hotProd.length > 0) {
      result = hotProd.map((product, index) => {
        return (
          <Product
            key={index}
            product={product}
            type="related"
            cart={this.props.cart}
            onAddToCart={this.props.onAddToCart}
            onCartBtnClick={this.props.onCartBtnClick}
            onDecreaseCart={this.props.onDecreaseCart}
          />
        );
      });
    }
    return result;
  };

  render() {
    let {
      products,
      onAddToCart,
      cart,
      onCartBtnClick,
      onDecreaseCart,
      onDeleteCart,
    } = this.props;
    console.log(cart);
    let { match } = this.props.match;
    let id = match.params.id;
    return (
      <div>
        {/* <Alert /> */}
        <Nav />
        <Cart cart={cart} />
        <CartItem
          cart={cart}
          onAddToCart={onAddToCart}
          onDecreaseCart={onDecreaseCart}
          onDeleteCart={onDeleteCart}
        />
        <ProductView
          products={products}
          id={id}
          onAddToCart={onAddToCart}
          cart={cart}
          onCartBtnClick={onCartBtnClick}
          onDecreaseCart={onDecreaseCart}
        />
        <RelateItems
          showProduct={this.showProduct}
          products={products}
          id={id}
        />
        <HotProducts showHotProd={this.showHotProd} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products,
    statusCartItem: state.statusCartItem,
    hotProd: state.hotProd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllProducts: () => {
      dispatch(actGetAllProduct());
    },
    onAddToCart: (product) => {
      dispatch(actAddToCart(product, 1));
    },
    onDecreaseCart: (product) => {
      dispatch(actDecreaseCart(product, 1));
    },
    onCartBtnClick: () => {
      dispatch(actCartBtnClick());
    },
    onDeleteCart: (product) => {
      dispatch(actDeleteCart(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
