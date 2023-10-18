import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Report from "./Report";
import ReportService from "../../services/ReportService";

const ReportList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [navLaborant, setNavLaborant] = useState(false);
  const [navAdd, setNavAdd] = useState(false);

  useEffect(() => {
    if (navLaborant) {
      navigate("/laborant/all");
    }

    if (navAdd) {
      navigate("/report/add");
    }
    setNavLaborant(false);
    setNavAdd(false);
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
  }, [navLaborant, navAdd, navigate]);

  const deleteReport = (e, id) => {
    e.preventDefault();
    ReportService.deleteReport(id, report, setReport);
  };

  const sortReportsByDate = (e) => {
    e.preventDefault();
    setLoading(true);
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
            onClick={setNavAdd}
            className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Add Report{" "}
          </button>
        </div>
        <div className="h-12">
          <button
            onClick={setNavLaborant}
            className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Laborants{" "}
          </button>
        </div>
        <div className="h-12">
          <button
            onClick={sortReportsByDate}
            className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Sort By Date{" "}
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
                Given Date
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>

          {report && !loading ? (
            <tbody className="bg-white">
              {report.map((report) => (
                <Report
                  report={report}
                  deleteReport={deleteReport}
                  key={report.id}
                ></Report>
              ))}
            </tbody>
          ) : (
            <p>No reports to display.</p>
          )}
        </table>
      </div>
    </div>
  );
};

export default ReportList;
