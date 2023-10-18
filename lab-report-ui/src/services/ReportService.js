import axios from "axios";
import LaborantService from "./LaborantService";

const REPORT_BASE_URL = "//localhost:8080/v1/report";
const token = localStorage.getItem("token");

const ReportService = {
  saveReport(report) {
    console.log(report.laborantId)
    console.log(LaborantService.getLaborantById(report.laborantId))
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "post",
      url: REPORT_BASE_URL,
      data: {
        patientFirstName: report.patientFirstName,
        patientLastName: report.patientLastName,
        identityNumber: report.identityNumber,
        diagnosis: report.diagnosis,
        diagnosisDetails: report.diagnosisDetails,
        laborant: LaborantService.getLaborantById(report.laborantId)
      },
    });
  },
  getReports() {
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "get",
      url: REPORT_BASE_URL,
      responseType: "json",
    });
  },
  getReportsOrderedByDate() {
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "get",
      url: REPORT_BASE_URL + "/getAllByDate",
      responseType: "json",
    });
  },
  deleteReport(id, report, setReport) {
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "delete",
      url: REPORT_BASE_URL + `/${id}`,
    })
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
        if (report) {
          setReport((prevElement) => {
            return prevElement.filter((element) => element.id !== id);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getReportById(id) {
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "get",
      url: REPORT_BASE_URL + `/${id}`,
    });
  },
  updateReport(id, report) {
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "put",
      url: REPORT_BASE_URL + `/updateReport/${id}`,
      data: report,
    });
  },
};

export default ReportService;
