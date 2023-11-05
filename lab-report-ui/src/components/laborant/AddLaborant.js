import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LaborantService from "../../services/LaborantService";

const AddLaborant = () => {
  const [listNav, setListNav] = useState(false);
  const token = localStorage.getItem("access_token");
  console.log(token)
  const [laborant, setLaborant] = useState({
    firstName: "",
    lastName: "",
    hospitalId: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setLaborant({ ...laborant, [e.target.name]: value });
  };

  const saveLaborant = (e) => {
    e.preventDefault();
    LaborantService.saveLaborant(laborant)
      .then((response) => {
        console.log(response.data);
        navigate("/laborant/all");
        // Handle data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setLaborant({
      firstName: "",
      lastName: "",
      hospitalId: ""
    });
  };

  useEffect(() => {
    if (listNav) {
      navigate("/laborant/all");
    }
  });

  return (
    <div>
      <div className="h-12 mt-16 ml-96">
        <button
          onClick={setListNav}
          className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Back To Laborant List{" "}
        </button>
      </div>
      <div className="flex max-w-xl mx-auto shadow border-b mt-8">
        <div className="px-8 py-8">
          <div className="font-thin text-2xl tracking-wider">
            <h1> Add New Laborant </h1>
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              {" "}
              First Name{" "}
            </label>
            <input
              type="text"
              name="firstName"
              value={laborant.firstName}
              onChange={(e) => handleChange(e)}
              className="h10 w-96 border mt-2 px-2 py-2"
            ></input>{" "}
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              {" "}
              Last Name{" "}
            </label>
            <input
              type="text"
              name="lastName"
              value={laborant.lastName}
              onChange={(e) => handleChange(e)}
              className="h10 w-96 border mt-2 px-2 py-2"
            ></input>{" "}
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              {" "}
              Identity Number{" "}
            </label>
            <input
              type="text"
              name="hospitalId"
              value={laborant.hospitalId}
              onChange={(e) => handleChange(e)}
              className="h10 w-96 border mt-2 px-2 py-2"
            ></input>{" "}
          </div>

          <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
            <button
              onClick={saveLaborant}
              className=" bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
            >
              {" "}
              Save{" "}
            </button>
            <button
              onClick={reset}
              className=" bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
            >
              {" "}
              Clear{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLaborant;
