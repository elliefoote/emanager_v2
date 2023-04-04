import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import API from "../helpers/API";

const INIT_STATE = {
  model: "",
  brand: "",
  serial_number: "",
  repair_status: "",
  client_id: "",
  assigned_to: "",
  notes: "",
};

function RepairForm({ formType, job, addRepairCB, editRepairCB }) {
  const [repairFormData, setRepairFormData] = useState(INIT_STATE);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getUsers();
    getClients();
  }, []);

  useEffect(() => {
    let { user, client, ...rest } = job;
    setRepairFormData(rest);
  }, [job]);

  const getUsers = async () => {
    let response = await API.getContent("/users");
    if (response.ok) {
      setUsers(response.data);
    } else {
      setErrorMsg(response.error);
    }
  };

  const getClients = async () => {
    let response = await API.getContent("/clients");
    if (response.ok) {
      setClients(response.data);
    } else {
      setErrorMsg(response.error);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (formType === "Edit") {
      editRepairCB(repairFormData);
    } else if (formType === "Add") {
      addRepairCB(repairFormData);
    }
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setRepairFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <Container>
      <form className="row m-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-4 form-control">
          <label htmlFor="inputModel" className="label">
            Model
          </label>
          <input
            type="text"
            name="model"
            value={repairFormData.model}
            onChange={handleChange}
            className="input input-bordered input-primary w-full"
            id="inputEmail4"
          />
        </div>
        <div className="mb-4 col-md-6">
          <label htmlFor="inputBrand" className="label">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={repairFormData.brand}
            onChange={handleChange}
            className="input input-bordered input-primary w-full"
            id="inputBrand4"
          />
        </div>
        <div className="mb-4 col-md-3">
          <label htmlFor="inputSerial" className="label">
            Serial Number
          </label>
          <input
            type="text"
            name="serial_number"
            value={repairFormData.serial_number}
            onChange={handleChange}
            className="input input-bordered input-primary w-full"
            id="inputSerialN"
            placeholder="IMEI"
          />
        </div>
        <div className="mb-4 col-md-3">
          <label htmlFor="inputState" className="label">
            Status
          </label>
          <select
            id="inputState"
            className="input input-bordered input-primary w-full"
            name="repair_status"
            value={repairFormData.repair_status}
            onChange={handleChange}
            required
          >
            <option value="">Choose...</option>
            <option>Not started</option>
            <option>In progress</option>
            <option>Can't be repaired</option>
            <option>Repaired</option>
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="inputclient" className="label">
            Client
          </label>
          <select
            className="select me-4"
            name="client_id"
            value={repairFormData.client_id}
            onChange={handleChange}
            required
          >
            <option value="">Choose existing client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.first_name} {c.last_name}
              </option>
            ))}
          </select>
        </div>

        {formType === "Add" ? (
          <div className="col-md-3">
            <label htmlFor="inputuser" className="label mt-3">
              Assigned to
            </label>
            <select
              className="select"
              name="assigned_to"
              value={repairFormData.assigned_to}
              onChange={handleChange}
              required
            >
              <option value="">Choose...</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.email}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="col-md">
            <div className="label mt-3">Assigned to: </div>
            <div className="me-5">
              {job.user != undefined && job.user.email}
              <div
                className="tooltip tooltip-right ms-3"
                data-tip="Only admins can reassign jobs after they are created"
              >
                <button className="btn">?</button>
              </div>
            </div>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="ControlTextarea1" className="label mt-3">
            Notes
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            id="ControlTextarea1"
            rows="3"
            name="notes"
            value={repairFormData.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-md-6 offset-md-5">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </Container>
  );
}

export default RepairForm;
