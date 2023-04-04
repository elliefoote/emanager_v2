import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import Local from "../helpers/Local";
import API from "../helpers/API";
import { useNavigate } from "react-router-dom";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(Local.getUser());
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUser(Local.getUser());
  }, []);

  async function handleLogin(username, password) {
    let response = await API.loginUser(username, password);
    if (response.ok) {
      Local.saveUserInfo(response.data.token, response.data.user);
      setUser(response.data.user);
      setError("");
      navigate("/myjobs");
    } else {
      setError(response.error);
      setShow(true);
    }
  }

  async function handleLogout() {
    Local.removeUserInfo();
    setUser(Local.getUser());
    setShow(false);
  }

  const handleSignUp = async (newUser) => {
    let response = await API.createUser(newUser.email, newUser.password);
    if (response.ok) {
      setError("");
    } else {
      setError(response.error);
      setShow(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        handleSignUp,
        show,
        setShow,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
