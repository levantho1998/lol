import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import "../../css/client/RelateItems.css";
class RelateItems extends Component {
  render() {
    let { products, id } = this.props;
    return (
      <div className="relate-items">
        <Container className="max-width">
          <Row className="ml-2">
            <h1>Related Items</h1>
          </Row>
          <Row>{this.props.showProduct(products, id)}</Row>
        </Container>
      </div>
    );
  }
}

export default RelateItems;
