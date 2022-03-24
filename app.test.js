const login = require("./http");
const axios = require("axios");
jest.mock("axios");

it("returns the title of the first album", async () => {
  axios.get.mockResolvedValue({
    data: {
      username: "admin",
      password: "1234",
    },
  });

  const isAuth = await login();
  expect(isAuth).toEqual(true);
});
