import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";

import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProducts.css";
const DashboardProducts = () => {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  // removing the product
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  const handleDeleteProduct = (id) => {
    // logic here
    if (window.confirm("Are you sure you want to delete this product?"))
      deleteProduct({ product_id: id, user_id: user._id });
  };
  function TableRow({ pictures, _id, name, price }) {
    return (
      <tr>
        <td>
          <img src={pictures[0].url} className="dashboard-product-preview" />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>
          <Button
            onClick={() => handleDeleteProduct(_id, user._id)}
            disabled={isLoading}
            style={{ backgroundColor: "#f94144", border: "none" }}
          >
            Delete
          </Button>
          <Link
            to={`/product/${_id}/edit`}
            style={{
              backgroundColor: "#008000",
              border: "none",
              color: "white",
              textDecoration: "none",
              padding: "5px 10px 9px",
              marginLeft: "10px",
              borderRadius:"5px"
            }}
          >
            Edit
          </Link>
        </td>
      </tr>
    );
  }
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
        </tr>
      </thead>
      <tbody>
        <Pagination
          data={products}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={5}
          tablePagination={true}
        />
      </tbody>
    </Table>
  );
};
export default DashboardProducts;
