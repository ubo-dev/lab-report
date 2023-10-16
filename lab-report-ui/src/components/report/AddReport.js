import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportService from "../../services/ReportService";

const AddReport = () => {
  const [listNav, setListNav] = useState(false);

  const [report, setReport] = useState({
    patientFirstName: "",
    patientLastName: "",
    identityNumber: "",
    diagnosis: "",
    diagnosisDetails: "",
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
    });
  };

  useEffect(() => {
    if (listNav) {
      navigate("/report/all");
    }
  });

  function handleNavigateReportList() {
    setListNav(true);
  }

  return (
    <div>
      <div className="h-12 mt-16 ml-96">
        <button
          onClick={handleNavigateReportList}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-opacity-0">
            Back To Report List{" "}
          </span>
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
    </div>
  );
};

export default AddReport;
