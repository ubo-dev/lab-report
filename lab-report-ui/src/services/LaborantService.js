import axios from "axios";

const REPORT_BASE_URL = "//localhost:8080/v1/laborant";

const LaborantService = {
  saveLaborant(laborant) {
    return axios({
      method: "post",
      url: REPORT_BASE_URL,
      data: {
        firstName: laborant.firstName,
        lastName: laborant.lastName,
        hospitalId: laborant.hospitalId,
        reports: laborant.reports
      },
    });
  },
  getLaborants() {
    return axios({
      method: "get",
      url: REPORT_BASE_URL,
      responseType: "json",
    });
  },
  getLaborantById(id) {
    return axios({ method: "get", url: REPORT_BASE_URL  + `/${id}`});
  },
};

export default LaborantService;
