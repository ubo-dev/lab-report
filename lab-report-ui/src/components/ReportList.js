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
    ReportService.deleteReport(id, report, setReport);
  };

  const sortReportsByDate = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("aloo");
    ReportService.getReportsOrderedByDate().then((response) => {
      try {
        setReport(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    });
    console.log(ReportService.getReportsOrderedByDate());
  };
  return (
    <div className="container mx-auto my-4">
      <div className="flex justify-between">
        <div className="h-12">
          <button
            onClick={() => navigate("/report/add")}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-opacity-0">
              Add Report{" "}
            </span>
          </button>
        </div>
        <div className="h-12">
          <button
            onClick={sortReportsByDate}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-opacity-0">
              Sort By Date{" "}
            </span>
          </button>
        </div>
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
