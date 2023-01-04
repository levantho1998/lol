import React, { Component } from "react";
import Header from "../../components/client/Header";
import Cart from "../../components/client/Cart";
import CartItem from "../../components/client/CartItem";
import Main from "../../components/client/Main";
import { connect } from "react-redux";
import Product from "../../components/client/Product";

// import Alert from '../../components/Alert'

import {
  actFilterCategoryRequest,
  actGetOneProduct,
  actAddToCart,
  actDecreaseCart,
  actDeleteCart,
  actGetAllProductRequest,
  actFindProductRequest,
  actGetAllCategoryRequest,
  actGetHotProductsRequest,
} from "../../actions/index";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 8,
    };
  }

  showProducts = (products) => {
    let result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <Product
            key={index}
            product={product}
            onGetOneProduct={this.props.onGetOneProduct}
          />
        );
      });
    }
    return result;
  };

  paginate = (number) => {
    this.setState({
      currentPage: number,
    });
  };

  componentDidMount() {
    this.props.onGetAllCategory();
    this.props.onGetAllProduct();
    this.props.onGetHotProducts();
  }

  render() {
    let { currentPage, perPage } = this.state;
    let {
      products,
      cart,
      onAddToCart,
      onDecreaseCart,
      onDeleteCart,
      onFilterProducts,
      onFindProduct,
      onGetAllProduct,
      category,
    } = this.props;
    const indexOfLastProduct = currentPage * perPage;
    const indexOfFirstProduct = indexOfLastProduct - perPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    return (
      <div>
        {/* <Alert /> */}
        <Header onFindProduct={onFindProduct} />
        <Cart cart={cart} />
        <CartItem
          cart={cart}
          onDecreaseCart={onDecreaseCart}
          onAddToCart={onAddToCart}
          onDeleteCart={onDeleteCart}
        />
        <Main
          showProducts={this.showProducts}
          products={currentProducts}
          perPage={perPage}
          totalProducts={products.length}
          paginate={this.paginate}
          onFilterProducts={onFilterProducts}
          onGetAllProduct={onGetAllProduct}
          category={category}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    cart: state.cart,
    statusAlert: state.statusAlert,
    category: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterProducts: (category) => {
      dispatch(actFilterCategoryRequest(category));
    },
    onGetAllProduct: () => {
      dispatch(actGetAllProductRequest());
    },
    onGetOneProduct: (id) => {
      dispatch(actGetOneProduct(id));
    },
    onFindProduct: (name) => {
      dispatch(actFindProductRequest(name));
    },
    onAddToCart: (product) => {
      dispatch(actAddToCart(product, 1));
    },
    onDecreaseCart: (product) => {
      dispatch(actDecreaseCart(product));
    },
    onDeleteCart: (product) => {
      dispatch(actDeleteCart(product));
    },
    onGetAllCategory: () => {
      dispatch(actGetAllCategoryRequest());
    },
    onGetHotProducts: () => {
      dispatch(actGetHotProductsRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
