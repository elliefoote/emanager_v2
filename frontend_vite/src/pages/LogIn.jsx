import React, { useState, useContext } from "react";
import UserForm from "../components/UserForm";

const LogIn = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-neutral border-2 border-neutral-content rounded p-10">
        <h2 className="text-xl">Log In</h2>
        <UserForm formType="login" />
      </div>
    </div>
  );
};

export default LogIn;
