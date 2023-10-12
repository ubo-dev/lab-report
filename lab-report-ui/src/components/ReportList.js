import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Report from "./Report";
import ReportService from "../services/ReportService";

const ReportList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ReportService.getReports();
        setReport(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteReport = (e, id) => {
    e.preventDefault();
    ReportService.deleteReport(id,report,setReport);
  };
  return (
    <div className="container mx-auto my-4">
      <div className="h-12">
        <button
          onClick={() => navigate("/report/add")}
          className="rounded bg-slate-600 text-white px-6 py-2"
        >
          {" "}
          Add Report{" "}
        </button>
      </div>
      <div className="flex shadow border-b mt-3">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                First Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Last Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Identity Number
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Diagnosis
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Diagnosis Details
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Given Date
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Document Photo
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {report.map((report) => (
                <Report
                  report={report}
                  deleteReport={deleteReport}
                  key={report.id}
                ></Report>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default ReportList;
