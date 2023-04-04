import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Repairs from "./pages/Repairs";
import AddRepairView from "./pages/AddRepairView";
import EditRepairView from "./pages/EditRepairView";
import MyJobs from "./pages/MyJobs";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import AuthContext from "./context/AuthContext";
import ErrorModal from "./components/ErrorModal";

export default function App() {
  const { show, error } = useContext(AuthContext);

  return (
    <div className="App bg-base-300 w-screen min-h-screen p-10">
      <div>
        {show && error && <ErrorModal />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/repairs"
            element={
              <PrivateRoute>
                <Repairs />
              </PrivateRoute>
            }
          />

          <Route
            path="/repairs/add"
            element={
              <PrivateRoute>
                <AddRepairView />
              </PrivateRoute>
            }
          />

          <Route
            path="/repairs/edit/:repair_id"
            element={
              <PrivateRoute>
                <EditRepairView />
              </PrivateRoute>
            }
          />

          <Route
            path="/myjobs"
            element={
              <PrivateRoute>
                <MyJobs />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
