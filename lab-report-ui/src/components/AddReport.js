import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportService from "../services/ReportService";

const AddReport = () => {
  const [report, setReport] = useState({
    id: "",
    firstName: "",
    lastName: "",
    identityNumber: "",
    diagnosis: "",
    diagnosisDetails: "",
    givenDate: "",
    documentPhoto: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setReport({ ...report, [e.target.name]: value });
  };

  const saveReport = (e) => {
    e.preventDefault();
    console.log(report);
    ReportService.saveReport(report)
      .then((response) => {
        console.log(response);
        navigate("/report/all");
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setReport({
      id: "",
      firstName: "",
      lastName: "",
      identityNumber: "",
      diagnosis: "",
      diagnosisDetails: "",
      givenDate: "",
      documentPhoto: "",
    });
  };

  return (
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
            name="firstName"
            value={report.firstName}
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
            value={report.lastName}
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
            Given Date{" "}
          </label>
          <input
            type="text"
            name="givenDate"
            value={report.givenDate}
            onChange={(e) => handleChange(e)}
            className="h10 w-96 border mt-2 px-2 py-2"
          ></input>{" "}
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            {" "}
            Document Photo{" "}
          </label>
          <input
            type="text"
            name="documentPhoto"
            value={report.documentPhoto}
            onChange={(e) => handleChange(e)}
            className="h10 w-96 border mt-2 px-2 py-2"
          ></input>{" "}
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={saveReport}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-600 py-2 px-2 w-20"
          >
            {" "}
            Save{" "}
          </button>
          <button
            onClick={reset}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-600 py-2 px-2 w-20"
          >
            {" "}
            Clear{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReport;
