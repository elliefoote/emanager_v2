import { useState, useContext } from "react";
import SubmitModal from "./SuccessModal";
import AuthContext from "../context/AuthContext";

const INIT_STATE = {
  email: "",
  password: "",
};

function UserForm({ formType }) {
  const [formData, setFormData] = useState(INIT_STATE);
  // TODO: Fix modal
  //   const [modalShow, setModalShow] = useState(false);
  //   const modalInfo = {
  //     title: "Account created successfully!",
  //     closetext: "Close window",
  //     backtext: "Log In",
  //     backpath: "/login",
  //   };

  const { handleSignUp, handleLogin } = useContext(AuthContext);

  function handleSubmit(event) {
    event.preventDefault();
    if (formType == "signup") {
      handleSignUp(formData);
    }
    if (formType == "login") {
      handleLogin(formData.email, formData.password);
    }
    //setModalShow(true);
    setFormData(INIT_STATE);
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default UserForm;
