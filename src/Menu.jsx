import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useShoppingCart } from "use-shopping-cart";
import "./Menu.css";

import { Link } from "react-router-dom";
const Menu = () => {
  const { cartCount } = useShoppingCart();
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Gestion Commerciale</Navbar.Brand>

          <Nav className="me-auto ">
            <Nav.Link as={Link} to="/categories">
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/scategories">
              Sous Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/articles">
              Articles
            </Nav.Link>
            <Nav.Link as={Link} to="/client">
              Client
            </Nav.Link>
          </Nav>
        </Container>
        <Nav.Link as={Link} to="/cart" className="cart-icon">
          <i className="fa-solid fa-cart-shopping"></i>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Nav.Link>
        &nbsp; &nbsp;
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default Menu;
