import React, { useEffect } from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import categories from "../Categories";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { updateProducts } from "../features/productSlice";
import Productpreview from "../components/Productpreview";
const Home = () => {
   const dispatch = useDispatch();
   const products = useSelector((state) => state.products);
  
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);

  return (
    <div>
      <img
        src="https://marketplace.canva.com/EAE-f2LBM8M/1/0/800w/canva-food-restaurant-etsy-cover-5Lwn_sb1hlY.jpg"
        className="home-banner"
        style={{
          width: "100%",
          // height: "90vh",
          objectFit: "cover",
          backgroundSize: "cover",
        }}
      />
      <div className="featured-products-container container mt-4"></div>
      {/*  salebanner */}
      {/* <div className="sale__banner--container mt-4">
        <img src="https://pizzahutbd.com/attached_images/deals/8/Double-Deal---OLO-Banner-Jan-10.jpg" />
      </div> */}
      <div className="recent-products-container container mt-4">
        <h2
          style={{
            textAlign: "center",
            fontWeight: "500",
            color: "#d00000",
            textShadow: "1.2px 1.2px #ffba08",
          }}
        >
          {" "}
          Explore Awesome Dishes
          <div>
            <Link
              to="/category/all"
              style={{
                textAlign: "right",
                display: "block",
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              See more {">>"}
            </Link>
          </div>
        </h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
