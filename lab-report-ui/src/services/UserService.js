import axios from "axios";

const REGISTER_URL = "//localhost:8080/v1/auth/register";
const LOGIN_URL = "//localhost:8080/v1/auth/authenticate";

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
  }
};

export default UserService;
