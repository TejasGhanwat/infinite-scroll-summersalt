import React, { Component } from "react";

export class Product extends Component {
  render() {
    return (
      <div className='product-item'>
        <img src={this.props.imgSrc} alt={this.props.title} />
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default Product;
