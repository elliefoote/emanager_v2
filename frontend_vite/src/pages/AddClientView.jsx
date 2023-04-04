import React, { useState } from "react";
import ClientForm from "../components/ClientForm";
import { IoMdPersonAdd } from "react-icons/io";
import SubmitModal from "../components/Modal";
import API from "../helpers/API";

function AddClientView(props) {
  const [modalShow, setModalShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const modalInfo = {
    title: "Client added!",
    closetext: "Add another client",
    backtext: "Go back to Clients list",
    backpath: "/clients",
  };

  const handleAddClient = async (newClient) => {
    let response = await API.addContent("/clients", newClient);
    if (response.ok) {
      console.log("Client added!");
      setModalShow(true);
    } else {
      setErrorMsg(response.error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-xl">Add New Client</h2>
      <ClientForm addClientCb={(newClient) => handleAddClient(newClient)} />

      <SubmitModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalInfo={modalInfo}
      />
    </div>
  );
}

export default AddClientView;
