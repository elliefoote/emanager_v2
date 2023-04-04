import React, { useState, useEffect } from "react";
import API from "../helpers/API";
import { Link } from "react-router-dom";
import { Col, Container, Row, Table, Alert } from "react-bootstrap";
import { IoMdPeople } from "react-icons/io";

function Clients(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    let response = await API.getContent("/clients");
    if (response.ok) {
      setClients(response.data);
    } else {
      setErrorMsg(response.error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    let response = await API.deleteContent(`/clients/${id}`);
    if (response.ok) {
      setClients(response.data);
    } else {
      setErrorMsg(response.error);
      setShow(true);
    }
  };

  return (
    <Container>
      <h2 className="text-xl">Clients</h2>

      <Row>
        <Col className="text-start mt-5 mb-5">
          <Link to="/clients/add" className="btn btn-primary" role="button">
            {" "}
            + Add new client
          </Link>
        </Col>
        <Col>
          <div className="input-group mt-5 mb-5">
            <input
              className="input me-2"
              type="text"
              placeholder="Search"
              name="search-term"
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </Col>
      </Row>

      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{errorMsg}</Alert.Heading>
          <p>
            This client still has repair jobs pending. Please mark the jobs as
            complete before deleting the client.
          </p>
        </Alert>
      )}

      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients
            .filter((c) => {
              if (searchTerm === "") {
                return c;
              } else if (
                c.first_name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return c;
              } else if (
                c.last_name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return c;
              } else if (
                c.email.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return c;
              }
            })
            .map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.first_name}</td>
                <td>{c.last_name}</td>
                <td>{c.email}</td>
                <td>
                  <Link
                    to={`/clients/edit/${c.id}`}
                    type="button"
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
}

export default Clients;
