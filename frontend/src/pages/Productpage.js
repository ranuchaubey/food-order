import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Productpage.css";
import Loading from "../components/Loading";
import {
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAddToCartMutation } from "../services/appApi";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useParams } from "react-router-dom";
import SimilarProduct from "../components/SimilarProduct";
import { LinkContainer } from "react-router-bootstrap";
import ToastMessage from "../components/ToastMessage";
const Productpage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const handleDragStart = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const images = product.pictures.map((picture) => (
    <img
      className="product__carousel--image"
      src={picture.url}
      onDragStart={handleDragStart}
    />
  ));
  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, idx) => (
      <div className="item" data-value={idx}>
        <SimilarProduct {...product} />
      </div>
    ));
  }
  return (
    <Container className="pt-4" style={{ position: "relative" }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </Col>
        <Col lg={6} className="pt-4">
          <h1 style={{ fontWeight: "400" }}>{product.name}</h1>
          <p>
            <Badge bg="danger">{product.category}</Badge>
          </p>
          <p className="product__price">
            {" "}
            <strong style={{ fontWeight: "500" }}>Price : </strong> $
            {product.price}
          </p>
          <p style={{ textAlign: "justify" }} className="py-3">
            <strong style={{ fontWeight: "500" }}>Description : </strong>
            {product.description}
          </p>
          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: "90%" }}>
              <Form.Select
                size="lg"
                style={{ width: "40%", borderRadius: "0" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              <Button
                size="lg"
                style={{ background: "#006400", border: "none" }}
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    price: product.price,
                    image: product.pictures[0].url,
                  })
                }
              >
                Add to Cart
              </Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button
                size="lg"
                style={{ background: "#001f54", border: "none" }}
              >
                Edit Product
              </Button>
            </LinkContainer>
          )}
          {isSuccess && (
            <ToastMessage
              title="Added to cart"
              body={`${product.name} is in your cart`}
              bg="info"
            />
          )}
        </Col>
      </Row>
      <div className="my-4">
        <h2 style={{ fontWeight: "400", textAlign: "center" }}>
          Similar Products
        </h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <AliceCarousel
            mouseTracking
            items={similarProducts}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </div>
      </div>
    </Container>
  );
};

export default Productpage;
