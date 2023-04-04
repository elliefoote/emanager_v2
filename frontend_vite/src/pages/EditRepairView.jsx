import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RepairForm from "../components/RepairForm";
import API from "../helpers/API";
import SuccessModal from "../components/SuccessModal";

const EditRepairView = (props) => {
  let { repair_id } = useParams();
  const [job, setJob] = useState({
    model: "",
    brand: "",
    serial_number: "",
    repair_status: "",
    client_id: "",
    assigned_to: "",
    notes: "",
  });
  const [modalShow, setModalShow] = useState(false);
  // TODO display error in modal/alert
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getJob(repair_id);
  }, []);

  const getJob = async () => {
    let response = await API.getContent(`/repairs/${repair_id}`);
    if (response.ok) {
      setJob(response.data);
    } else {
      setErrorMsg(response.error);
    }
  };

  const handleEditRepair = async (updatedRepairObj) => {
    console.log("line 43");
    let response = await API.updateContent(
      `/repairs/${repair_id}`,
      updatedRepairObj
    );
    if (response.ok) {
      setModalShow(true);
    } else {
      setErrorMsg(response.error);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl">Edit Repair Order</h2>
      </div>
      <RepairForm
        job={job}
        editRepairCB={(updatedRepairObj) => handleEditRepair(updatedRepairObj)}
        formType="Edit"
      />
      {modalShow && (
        <SuccessModal
          alertText="Repair edited successfully"
          closeModalCB={() => setModalShow(false)}
        />
      )}
    </div>
  );
};

export default EditRepairView;
