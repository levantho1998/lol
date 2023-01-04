import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import Pagination from "./Pagination";
import NotFound from "../NotFound";
class Products extends Component {
  render() {
    let {
      products,
      perPage,
      totalProducts,
      paginate,
      onGetAllProduct,
      //   onGetHotProducts,
    } = this.props;
    return (
      <Col lg="9" xl="10">
        <div className="products">
          <div className="h-100 container">
            {!products.length ? (
              <NotFound onGetAllProduct={onGetAllProduct} />
            ) : (
              <Row>{this.props.children(products)}</Row>
            )}
            <Row style={{ justifyContent: "center" }}>
              <Pagination
                perPage={perPage}
                totalProducts={totalProducts}
                paginate={paginate}
              />
            </Row>
          </div>
        </div>
      </Col>
    );
  }
}
export default Products;
