import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Link } from "react-router-dom";
import "./Cart.css"; // Ajoutez un fichier CSS pour les styles.

const Cart = () => {
  const {
    cartDetails,
    removeItem,
    clearCart,
    totalPrice,
    cartCount,
    incrementItem,
    decrementItem,
  } = useShoppingCart();

  if (cartCount === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="cart-empty">
          <p>Panier Vide</p>
          <div className="start-shopping">
            <Link to="/client">
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-header">
        <h3>Product</h3>
        <h3>Price</h3>
        <h3>Quantity</h3>
        <h3>Total</h3>
      </div>
      <div className="cart-items">
        {cartDetails &&
          Object.values(cartDetails).map((cartItem) => (
            <div className="cart-item" key={cartItem.id}>
              <div className="cart-product">
                <img src={cartItem.image} alt={cartItem.title} />
                <div>
                  <h4>{cartItem.title}</h4>
                  <button
                    onClick={() => removeItem(cartItem.id)}
                    aria-label="Remove item"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
              <div className="cart-product-price">{cartItem.price} TND</div>
              <div className="cart-product-quantity">
                <button onClick={() => decrementItem(cartItem.id)}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => incrementItem(cartItem.id)}>+</button>
              </div>
              <div className="cart-product-total">
                {cartItem.quantity * cartItem.price} TND
              </div>
            </div>
          ))}
      </div>
      <div className="cart-footer">
        <button className="clear-cart" onClick={clearCart}>
          Clear Cart
        </button>
        <div className="cart-summary">
          <h4>Subtotal: {totalPrice} TND</h4>
          <p>Taxes and shipping calculated at checkout</p>
          <button className="checkout-btn">CHECK OUT</button>
          <Link to="/client" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
