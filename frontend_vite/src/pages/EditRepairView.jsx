import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RepairForm from "../components/RepairForm";
import API from "../helpers/API";
import SubmitModal from "../components/Modal";

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

  // TODO improve error handling
  const [modalShow, setModalShow] = useState(false);
  const modalInfo = {
    title: "Repair edited!",
    closetext: "Do more edits",
    backtext: "Go back to Repairs list",
    backpath: "/repairs",
  };
  const [errorMsg, setErrorMsg] = useState("");

  const handleEditRepair = async (updatedRepairObj) => {
    console.log("line 43");
    let response = await API.updateContent(
      `/repairs/${repair_id}`,
      updatedRepairObj
    );
    if (response.ok) {
      console.log("Repair edited!");
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

      <SubmitModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalInfo={modalInfo}
      />
    </div>
  );
};

export default EditRepairView;
