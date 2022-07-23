import React, {useState, useEffect } from "react";
import "./Orderspage.css";
import Loading from "../components/Loading"
import { Badge, Container, Table } from "react-bootstrap";
import axios from "../axios";
import { useSelector } from "react-redux";
const Orderspage = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);
    if (loading) {
        return <Loading/>
    }
    if (orders.length === 0) {
        return <h2 className="text-center pt-3">No orders yet</h2>
    }
  return (
    <Container>
      <h1 className="text-center" style={{ fontWeight: "400" }}>
        Your orders
      </h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>#</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Date</th>
            <th style={{ textAlign: "center" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td style={{ textAlign: "center" }}>{order._id}</td>
              <td style={{ textAlign: "center" }}>
                <Badge
                  bg={`${order.status == "processing" ? "warning" : "success"}`}
                  text="white"
                >
                  {order.status}
                </Badge>
              </td>
              <td style={{ textAlign: "center" }}>{order.date}</td>
              <td style={{ textAlign: "center" }}>${order.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Orderspage;
