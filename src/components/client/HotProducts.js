import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";

import "../../css/client/RelateItems.css";
class HotProducts extends Component {
  render() {
    const { hotProd, id, showHotProd } = this.props;

    return (
      <div className="relate-items">
        <Container className="max-width">
          <Row className="ml-2">
            <h1>Hot Books</h1>
          </Row>
          <Row>{showHotProd(hotProd, id)}</Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    hotProd: state.hotProd,
  };
};
export default connect(mapStateToProps)(HotProducts);
