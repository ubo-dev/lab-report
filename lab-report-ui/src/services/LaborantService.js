import axios from "axios";

const REPORT_BASE_URL = "http://localhost:8080/api/laborant";

const access_token =  localStorage.getItem("access_token");

const LaborantService = {
  saveLaborant(laborant) {
    console.log(access_token)
    return axios({
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "post",
      url: REPORT_BASE_URL + "/createLaborant",
      data: {
        firstName: laborant.firstName,
        lastName: laborant.lastName,
        hospitalId: laborant.hospitalId
      },
    });
  },
  getLaborants() {
    console.log(access_token)
    return axios({
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "get",
      url: REPORT_BASE_URL + "/getAllLaborant",
      responseType: "json",
    });
  },
  getLaborantById(id) {
    console.log(id)
    return axios({
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "get",
      url: REPORT_BASE_URL + `/getLaborantById/${id}`,
    });
  },
};

export default LaborantService;
