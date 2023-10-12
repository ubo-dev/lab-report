import axios from "axios";

const REPORT_BASE_URL = "//localhost:8080/v1/report";

const ReportService = {
  saveReport(report) {
    return axios({
      method: "post",
      url: REPORT_BASE_URL,
      data: {
        patientFirstName: report.patientFirstName,
        patientLastName: report.patientLastName,
        identityNumber: report.identityNumber,
        diagnosis: report.diagnosis,
        diagnosisDetails: report.diagnosisDetails,
      },
    });
  },
  getReports() {
    return axios({
      method: "get",
      url: REPORT_BASE_URL,
      responseType: "json",
    });
  },
  getReportsOrderedByDate() {
    return axios({
      method: "get",
      url: REPORT_BASE_URL + "/getAllByDate",
      responseType: "json",
    });
  },
  deleteReport(id,report,setReport) {
    axios
      .delete(REPORT_BASE_URL + `/${id}`)
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
    return axios({ method: "get", url: REPORT_BASE_URL  + `/${id}`});
  },
  updateReport(id, report) {
    console.log(report)
    return axios({
      method: "put",
      url: REPORT_BASE_URL + `/updateReport/${id}`,
      data: report
    });
  },
};

export default ReportService;
