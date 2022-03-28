const axios = require("axios");

async function login() {
  const response = await axios.post("http://localhost:8000/api/login", {
    username: "admin",
    password: "1234",
  });

  return response.data.isAuth;
}

module.exports = login;
