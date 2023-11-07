import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportService from "../../services/ReportService";

const FindReportById = () => {
  const [listNav, setListNav] = useState(false);
  const [foundReport, setFoundReport] = useState(null);
  const token = localStorage.getItem("access_token");
  console.log(token);
  const [report, setReport] = useState({
    identityNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setReport({ ...report, [e.target.name]: value });
  };

  const findReportById = (e) => {
    e.preventDefault();
    navigate(`/report/view/${foundReport.id}`);
    // Handle data
  };

  useEffect(() => {

    if (listNav) {
      navigate("/report/all");
    }

    const fetchData = async () => {
      try {
        const response = await ReportService.getReportByIdentityNumber(
          report.identityNumber
        );
        console.log(response.data.laborantId);
        setFoundReport(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [foundReport?.id, report.identityNumber, listNav, navigate]);

  const reset = (e) => {
    e.preventDefault();
    setReport({
      firstName: "",
      lastName: "",
    });
  };

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
            <h1> Find Report By Identity Number </h1>
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

          <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
            <button
              onClick={findReportById}
              className=" bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
            >
              {" "}
              Find{" "}
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

export default FindReportById;
