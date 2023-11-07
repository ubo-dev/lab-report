import axios from "axios";

const REGISTER_URL = "http://localhost:6060/api/auth/register";
const LOGIN_URL = "http://localhost:6060/api/auth/login";
const REFRESH_URL = "http://localhost:6060/api/auth/refresh-token"

const UserService = {
  saveUser(user) {
    return axios({
      method: "post",
      url: REGISTER_URL,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role
      },
    });
  },
  loginUser(userCredentials) {
    return axios({
        method: "post",
        url: LOGIN_URL,
        data: {
            email: userCredentials.email,
            password: userCredentials.password
        }
    })
  },
  refreshToken(access_token) {
    return axios({
      method: "post",
      url: REFRESH_URL,
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
  }
};

export default UserService;
