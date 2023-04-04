import React, { useState, useEffect, useContext } from "react";
import API from "../helpers/API";
import AuthContext from "../context/AuthContext";

const MyJobs = (props) => {
  const [myRepairs, setMyRepairs] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [filter, setFilter] = useState("Show all");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getRepairs();
  });

  const getRepairs = async () => {
    let response = await API.getContent(`/repairs/user/${user.id}`);
    // Get repairs by userid
    if (response.ok) {
      let filtered = response.data;
      setMyRepairs(filtered);
    } else {
      setErrorMsg(response.error);
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="container w-full h-full">
      <h2 className="text-xl">My Jobs</h2>

      <div className="my-6 dropdown">
        <label className="me-2">Filter by status:</label>
        <select onChange={(e) => handleFilter(e)} className="select">
          <option value="Show all">Show all</option>
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
          <option value="Can't be repaired">Can't be repaired</option>
          <option value="Repaired">Repaired</option>
        </select>
      </div>

      <table className="table w-full">
        <thead className="bg-darkslate">
          <tr className="">
            <th>Model</th>
            <th>Brand</th>
            <th>Serial number</th>
            <th>Status</th>
            <th>Client name</th>
          </tr>
        </thead>
        <tbody className="bg-midslate">
          {myRepairs
            .filter((r) => {
              if (filter === "Show all") {
                return r;
              } else if (r.repair_status === filter) {
                return r;
              }
            })
            .map((r) => (
              <tr key={r.id}>
                <td>{r.model}</td>
                <td>{r.brand}</td>
                <td>{r.serial_number}</td>
                <td>{r.repair_status}</td>
                <td>
                  {r.client.first_name} {r.client.last_name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyJobs;
