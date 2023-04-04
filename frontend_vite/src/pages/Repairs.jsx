import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import API from "../helpers/API";

function Repairs(props) {
  const [input, setInput] = useState("");
  const [repairs, setRepairs] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getRepairs();
  }, []);

  const getRepairs = async () => {
    let response = await API.getContent("/repairs");
    if (response.ok) {
      setRepairs(response.data);
    } else {
      setErrorMsg(response.error);
    }
  };

  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  const handleDelete = async (id) => {
    let response = await API.deleteContent(`/repairs/${id}`);
    if (response.ok) {
      let updatedRepairs = await getRepairs();
      setRepairs(updatedRepairs);
    } else {
      setErrorMsg(response.error);
      setShow(true);
    }
  };

  return (
    <Container>
      <h2 className="text-xl">Repairs</h2>
      <Row>
        <Col className="text-start mt-5 mb-5">
          <Link to="/repairs/add" className="btn btn-primary" role="button">
            + Add Repair
          </Link>
        </Col>
        <Col>
          <div className="input-group mt-5 mb-5">
            <input
              className="input me-2"
              name="input"
              placeholder="Search..."
              type="text"
              value={input}
              onChange={(e) => handleSearch(e)}
              aria-label="Search"
            />
          </div>
        </Col>
      </Row>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Model</th>
            <th>Brand</th>
            <th>Serial number</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Client name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {repairs &&
            repairs
              .filter((r) => {
                if (input === "") {
                  return r;
                } else if (
                  r.model.toLowerCase().includes(input.toLowerCase())
                ) {
                  return r;
                } else if (
                  r.brand.toLowerCase().includes(input.toLowerCase())
                ) {
                  return r;
                } else if (
                  r.serial_number.toLowerCase().includes(input.toLowerCase())
                ) {
                  return r;
                } else if (
                  r.client.first_name
                    .toLowerCase()
                    .includes(input.toLowerCase())
                ) {
                  return r;
                } else if (
                  r.client.last_name.toLowerCase().includes(input.toLowerCase())
                ) {
                  return r;
                }
              })
              .map((r) => (
                <tr key={r.id}>
                  <td>{r.model}</td>
                  <td>{r.brand}</td>
                  <td>{r.serial_number}</td>
                  <td>{r.repair_status}</td>
                  <td>{r.user.email}</td>
                  <td>
                    {r.client.first_name} {r.client.last_name}
                  </td>
                  <td>
                    <Link
                      to={"/repairs/edit/" + r.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => handleDelete(r.id)}
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

export default Repairs;
