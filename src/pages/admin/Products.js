import React, { Component } from "react";
import Header from "../../components/admin/Header";
import Nav from "../../components/admin/NavAdmin";
import Main from "../../components/admin/Main";
import Product from "../../components/client/Product";
import ProductFunc from "../../components/admin/ProductFunc";
import { connect } from "react-redux";
import {
  actGetAllProductRequest,
  actFilterProductsAdminRequest,
  actFindProductRequest,
  actFilterProductByNameAdminRequest,
  actToggleFormProduct,
  actGetProductUpdate,
  actResetProductUpdate,
  actDeleteProductRequest,
  actAddProductRequest,
  actUpdateProductRequest,
  actGetAllCategoryRequest,
} from "../../actions/index";
import { Redirect } from "react-router-dom";

class Products extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      currentPage: 1,
      perPage: 8,
    };
  }

  componentDidMount() {
    this.props.onGetAllCategory();
    this.props.onGetAllProduct();
  }

  showProducts = (products) => {
    let result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <Product
            key={index}
            product={product}
            type="admin"
            onOpenFormProduct={this.props.onOpenFormProduct}
            onGetProductUpdate={this.props.onGetProductUpdate}
            deleteProduct={this.props.deleteProduct}
          />
        );
      });
    }
    return result;
  };

  // deleteProduct = (product) => {
  //     // callApi(`api/product/${_id}`,'DELETE',NULL)
  //     console.log(product._id)
  //     if (confirm(`bạn chắc chắn muốn xoá ${product.name}?`)) { //eslint-disable-line
  //         // this.props.onDeleteProduct(id);
  //         callApi(`api/product/${product._id}`,'DELETE',null)
  //     }
  // }

  paginate = (number) => {
    this.setState({
      currentPage: number,
    });
  };

  render() {
    let adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      return <Redirect to="/admin/login" />;
    }
    let { currentPage, perPage } = this.state;
    let {
      products,
      onFilterProducts,
      onFindProduct,
      onFilterProductsByName,
      onOpenFormProduct,
      isOpenFormProduct,
      onCloseFormProduct,
      productEditing,
      onResetProductUpdate,
      onAddProduct,
      onUpdateProduct,
      isClick,
      category,
    } = this.props;
    const indexOfLastProduct = currentPage * perPage;
    const indexOfFirstProduct = indexOfLastProduct - perPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    return (
      <React.Fragment>
        <Header onOpenFormProduct={onOpenFormProduct} />
        <Nav match={this.props.match} />
        {isOpenFormProduct ? (
          <ProductFunc
            isOpenFormProduct={isOpenFormProduct}
            onCloseFormProduct={onCloseFormProduct}
            productEditing={productEditing}
            onResetProductUpdate={onResetProductUpdate}
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            category={category}
            // onSetIsClickTrue={onSetIsClickTrue}
            // isClick={isClick}
          />
        ) : (
          ""
        )}

        <Main
          showProducts={this.showProducts}
          products={currentProducts}
          perPage={perPage}
          totalProducts={products.length}
          paginate={this.paginate}
          onFilterProducts={onFilterProducts}
          onFindProduct={onFindProduct}
          onFilterProductsByName={onFilterProductsByName}
          category={category}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    isOpenFormProduct: state.isOpenFormProduct,
    productEditing: state.productEditing,
    category: state.category,
    // isClick: state.isClick
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllProduct: () => {
      dispatch(actGetAllProductRequest());
    },
    onFilterProducts: (keyword, category, priceType) => {
      dispatch(actFilterProductsAdminRequest(keyword, category, priceType));
    },
    onFindProduct: (name) => {
      dispatch(actFindProductRequest(name));
    },
    onFilterProductsByName: (keyword) => {
      dispatch(actFilterProductByNameAdminRequest(keyword));
    },
    onOpenFormProduct: () => {
      dispatch(actToggleFormProduct());
    },
    onCloseFormProduct: () => {
      dispatch(actToggleFormProduct());
    },
    onGetProductUpdate: (product) => {
      dispatch(actGetProductUpdate(product));
    },
    onResetProductUpdate: () => {
      dispatch(actResetProductUpdate());
    },
    deleteProduct: (product) => {
      dispatch(actDeleteProductRequest(product));
    },
    onAddProduct: (product) => {
      dispatch(actAddProductRequest(product));
    },
    onUpdateProduct: (product) => {
      dispatch(actUpdateProductRequest(product));
    },
    onGetAllCategory: () => {
      dispatch(actGetAllCategoryRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
