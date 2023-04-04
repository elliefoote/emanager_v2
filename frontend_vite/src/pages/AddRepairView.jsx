import React, { useState } from "react";
import RepairForm from "../components/RepairForm";
import { AiOutlineForm } from "react-icons/ai";
import API from "../helpers/API";
import SubmitModal from "../components/Modal";

const AddRepairView = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const job = {
    model: "",
    brand: "",
    serial_number: "",
    repair_status: "",
    client_id: "",
    assigned_to: "",
    notes: "",
  };

  const modalInfo = {
    title: "Repair added!",
    closetext: "Add another repair",
    backtext: "Go back to Repairs list",
    backpath: "/repairs",
  };

  const handleAddRepair = async (newRepairObj) => {
    let response = await API.addContent("/repairs", newRepairObj);
    if (response.ok) {
      console.log("Repair added!");
      setModalShow(true);
    } else {
      setErrorMsg(response.error);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl">New Repair Order</h2>
      </div>
      <RepairForm
        user={props.user}
        job={job}
        addRepairCb={(newRepairObj) => handleAddRepair(newRepairObj)}
        formType="Add"
      />

      <SubmitModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalInfo={modalInfo}
      />
    </div>
  );
};

export default AddRepairView;
