import React from "react";
import Product from "./product";

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      limit: 10,
      page: 1,
      products: [],
      scrolling: false,
    };
  }

  componentDidMount() {
    this.loadProducts();
    this.scrollListener = window.addEventListener("scroll", (e) => {
      this.handleScroll(e);
    });
  }

  handleScroll = (e) => {
    const { scrolling } = this.state;
    if (scrolling) return;

    const lastLi = document.querySelector("ul.productList > li:last-child");
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    var bottomOffset = 20;
    if (pageOffset > lastLiOffset - bottomOffset) {
      this.loadMore();
    }
  };

  loadProducts = () => {
    const { limit, page, products } = this.state;
    fetch(
      `https://summersalt.com/collections/swimwear/products.json?page=${page}&limit=${limit}`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          products: [...products, ...json.products],
          scrolling: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  loadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
        scrolling: true,
      }),
      this.loadProducts
    );
  };

  render() {
    return (
      <div>
        <ul className='productList'>
          {this.state.products.map((product) => (
            <li key={product.id}>
              <Product title={product.title} imgSrc={product.images[0].src} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductList;
