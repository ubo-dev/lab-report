import axios from "axios";

const REPORT_BASE_URL = "http://localhost:8080/v1/report"

const ReportService = {

    saveReport(report) {
        console.log(report)
        return axios.post(REPORT_BASE_URL, {report})
    },
    getReports() {
        return axios.get(REPORT_BASE_URL)
    },
    deleteReport(id) {
        return axios.delete(REPORT_BASE_URL+ "/", id)
    },
    getReportById(id) {
        return axios.get(REPORT_BASE_URL + "/",id)
    },
    updateReport(id, report) {
        return axios.put(REPORT_BASE_URL+ "/",id + "/" ,report)
    }

}

export default ReportService;