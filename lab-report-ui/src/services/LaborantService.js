import axios from "axios";

const REPORT_BASE_URL = "//localhost:8080/v1/laborant";

const token =  localStorage.getItem("token");

const LaborantService = {
  saveLaborant(laborant) {
    console.log(token)
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "post",
      url: REPORT_BASE_URL,
      data: {
        firstName: laborant.firstName,
        lastName: laborant.lastName,
        hospitalId: laborant.hospitalId,
        reports: laborant.reports,
      },
    });
  },
  getLaborants() {
    console.log(token)
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "get",
      url: REPORT_BASE_URL,
      responseType: "json",
    });
  },
  getLaborantById(id) {
    console.log(id)
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "get",
      url: REPORT_BASE_URL + `/${id}`,
    });
  },
};

export default LaborantService;
