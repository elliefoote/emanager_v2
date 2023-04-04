import React, { useState } from "react";
import RepairForm from "../components/RepairForm";
import { AiOutlineForm } from "react-icons/ai";
import API from "../helpers/API";
import SuccessModal from "../components/SuccessModal";

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

  const handleAddRepair = async (newRepairObj) => {
    let response = await API.addContent("/repairs", newRepairObj);
    if (response.ok) {
      setModalShow(true);
    } else {
      setErrorMsg(response.error);
      // TODO display in error modal
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
        addRepairCB={(newRepairObj) => handleAddRepair(newRepairObj)}
        formType="Add"
      />
      {modalShow && (
        <SuccessModal
          alertText="Repair created successfully"
          closeModalCB={() => setModalShow(false)}
        />
      )}
    </div>
  );
};

export default AddRepairView;
