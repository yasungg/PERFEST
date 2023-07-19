import axios from "axios";

const LoginAPI = {
  Login: async (email, password) => {
    // 로그인
    const requestBody = {
      username: email,
      password: password,
    };
    const stringified = JSON.stringify(requestBody);

    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    console.log(stringified);
    console.log(requestBody);

    return await axios
      .post(`/auth/member/login`, stringified, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      });
  },
  Logout: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios
      .get(`/logout/bye`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        },
      })
      .then(() => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("tokenExpiresIn", "");
      });
  },
};
export default LoginAPI;
