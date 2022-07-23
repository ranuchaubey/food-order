import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import "./Categorypage.css";
import Productpreview from "../components/Productpreview";
// import Pagination from "../components/Pagination";
import axios from "../axios";
import { Col, Row, Container } from "react-bootstrap";
const Categorypage = () => {
  const { category } = useParams();
  console.log("category", category);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchterm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, [category]);

  if (loading) {
    <Loading />;
  }
  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchterm.toLowerCase())
  );
  const ProductSearch =({ _id, category, name, pictures })=> {
    return (
      <Productpreview
        _id={_id}
        category={category}
        name={name}
        pictures={pictures}
      />
    );
  }
  return (
    <div className="category-page-container">
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className="text-center">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div className="filters-container d-flex justify-content-center pt-4 pb-4">
        <input
          type="search"
          style={{
            border: "none",
            outline: "none",
            fontWeight: "500",
            fontSize: "20px",
            letterSpacing: "1px",
            textAlign: "center",
          }}
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {productsSearch.length === 0 ? (
        <h1 style={{ textAlign: "center", fontWeight: "400" }}>
          No products to show
        </h1>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              {/* <Pagination
                data={productsSearch}
                RenderComponent={ProductSearch}
                pageLimit={1}
                dataLimit={5}
                tablePagination={false}
              /> */}
              <div className="d-flex justify-content-center align-items-center flex-wrap">
                {productsSearch.map((product) => (
                  <Productpreview {...product} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Categorypage;
