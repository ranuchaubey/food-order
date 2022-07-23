import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Table } from "react-bootstrap";
import Loading from "./Loading";
const ClientAdminpage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => {
          setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);
  if (loading) {
    return <Loading />;
    }
    if(users?.length==0) return <h2 className='py-2 text-center'>No users yet</h2>
    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Client Id</th>
            <th style={{ textAlign: "center" }}>Client Name</th>
            <th style={{ textAlign: "center" }}>Client Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td style={{ textAlign: "center" }}>{user._id}</td>
              <td style={{ textAlign: "center" }}>{user.name}</td>
              <td style={{ textAlign: "center" }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
};

export default ClientAdminpage;
