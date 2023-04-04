import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function SubmitModal(props) {
  return (
    <div className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Success!</h3>
        <p className="py-4">
          You've been selected for a chance to get one year of subscription to
          use Wikipedia for free!
        </p>
        <div className="modal-action">
          <label htmlFor="my-modal" className="btn">
            Yay!
          </label>
        </div>
      </div>
    </div>
  );
}

export default SubmitModal;
