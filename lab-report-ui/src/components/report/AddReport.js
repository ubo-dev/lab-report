import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportService from "../../services/ReportService";

const AddReport = () => {
  const [listNav, setListNav] = useState(false);
  const access_token =  localStorage.getItem("access_token");
  const [report, setReport] = useState({
    patientFirstName: "",
    patientLastName: "",
    identityNumber: "",
    diagnosis: "",
    diagnosisDetails: "",
    laborantId: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setReport({ ...report, [e.target.name]: value });
  };


  const saveReport = (e) => {
    e.preventDefault();
    console.log(access_token);
    ReportService.saveReport(report)
      .then((response) => {
        console.log(response.data);
        navigate("/report/all");
        // Handle data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setReport({
      patientFirstName: "",
      patientLastName: "",
      identityNumber: "",
      diagnosis: "",
      diagnosisDetails: "",
      laborantId: ""
    });
  };

  useEffect(() => {
    if (listNav) {
      navigate("/report/all");
    }
  });

  return (
    <div>
      <div className="h-12 mt-16 ml-96">
        <button
          onClick={setListNav}
          className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Back To Report List{" "}
        </button>
      </div>
      <div className="flex max-w-xl mx-auto shadow border-b mt-8">
        <div className="px-8 py-8">
          <div className="font-thin text-2xl tracking-wider">
            <h1> Add New Report </h1>
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              {" "}
              First Name{" "}
            </label>
            <input
              type="text"
              name="patientFirstName"
              value={report.patientFirstName}
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
              name="patientLastName"
              value={report.patientLastName}
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
              name="identityNumber"
              value={report.identityNumber}
              onChange={(e) => handleChange(e)}
              className="h10 w-96 border mt-2 px-2 py-2"
            ></input>{" "}
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              {" "}
              Diagnosis{" "}
            </label>
            <input
              type="text"
              name="diagnosis"
              value={report.diagnosis}
              onChange={(e) => handleChange(e)}
              className="h10 w-96 border mt-2 px-2 py-2"
            ></input>{" "}
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              {" "}
              Diagnosis Details{" "}
            </label>
            <input
              type="text"
              name="diagnosisDetails"
              value={report.diagnosisDetails}
              onChange={(e) => handleChange(e)}
              className="h10 w-96 border mt-2 px-2 py-2"
            ></input>{" "}
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              {" "}
              Laborant ID{" "}
            </label>
            <input
              type="text"
              name="laborantId"
              value={report.laborantId}
              onChange={(e) => handleChange(e)}
              className="h10 w-96 border mt-2 px-2 py-2"
            ></input>{" "}
          </div>

          <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
            <button
              onClick={saveReport}
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

export default AddReport;
