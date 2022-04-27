import "./product-card.styles.scss";
import { useContext } from "react";
import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const onClickHandler = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button type="inverted" onClick={onClickHandler}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;

// for every button click, item needs to be sent to cart
// does item already exist? if not, then add name, image, etc.
// initial click adds +1 for every quantity.
// adds 'x' for mulitply
