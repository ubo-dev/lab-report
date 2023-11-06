import axios from "axios";

const REPORT_BASE_URL = "http://localhost:8080/api/report";
const access_token = localStorage.getItem("access_token");



const ReportService = {
  saveReport(report) {
    debugger

    return axios({
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "post",
      url: REPORT_BASE_URL + "/createReport",
      data: {
        patientFirstName: report.patientFirstName,
        patientLastName: report.patientLastName,
        identityNumber: report.identityNumber,
        diagnosis: report.diagnosis,
        diagnosisDetails: report.diagnosisDetails,
        laborantId: report.laborantId
      },
    });
  },
  getReports() {
    return axios({
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "get",
      url: REPORT_BASE_URL + "/getAllReport",
      responseType: "json",
    });
  },
  getReportsOrderedByDate() {
    return axios({
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "get",
      url: REPORT_BASE_URL + "/getAllReportsByDate",
      responseType: "json",
    });
  },
  deleteReport(id, report, setReport) {
    return axios({
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "delete",
      url: REPORT_BASE_URL + `/deleteReportById/${id}`,
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
        Authorization: `Bearer ${access_token}`,
      },
      method: "get",
      url: REPORT_BASE_URL + `/getReportById/${id}`,
    });
  },
  getReportByName(firstName, lastName) {
    return axios({
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "get",
      url: REPORT_BASE_URL + `/getReportByName/${firstName}-${lastName}`,
    });
  },
  getReportByIdentityNumber(identityNumber) {
    return axios({
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "get",
      url: REPORT_BASE_URL + `/getReportByIdentityNumber/${identityNumber}`,
    });
  },
  updateReport(id, report) {
    return axios({
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "put",
      url: REPORT_BASE_URL + `/updateReport/${id}`,
      data: report,
    });
  },
};

export default ReportService;
