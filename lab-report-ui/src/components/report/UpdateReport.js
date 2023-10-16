import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReportService from "../../services/ReportService";

const UpdateReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState({
    id: id,
    patientFirstName: "",
    patientLastName: "",
    identityNumber: "",
    diagnosis: "",
    diagnosisDetails: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setReport({ ...report, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReportService.getReportById(report.id);
        setReport(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [report.id]);

  const updateReport = (e) => {
    e.preventDefault();
    console.log(report);
    ReportService.updateReport(id, report)
      .then((response) => {
        navigate("/report/all");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex max-w-xl mx-auto shadow border-b mt-10">
      <div className="px-8 py-8">
        <div className="text-2xl tracking-wider">
          <h1>Update Report</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            First Name
          </label>
          <input
            type="text"
            name="patientFirstName"
            value={report.patientFirstName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Last Name
          </label>
          <input
            type="text"
            name="patientLastName"
            value={report.patientLastName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Identity Number
          </label>
          <input
            type="text"
            name="identityNumber"
            value={report.identityNumber}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Diagnosis
          </label>
          <input
            type="text"
            name="diagnosis"
            value={report.diagnosis}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Diagnosis Details
          </label>
          <input
            type="text"
            name="diagnosisDetails"
            value={report.diagnosisDetails}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateReport}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/report/all")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateReport;
