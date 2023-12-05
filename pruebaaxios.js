const axios = require("axios");

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
};
// Hacer una petición para un usuario con ID especifico
axios
  .get("https://www.buda.com/api/v2/markets/eth-btc/ticker", {
    headers,
  })
  .then(function (response) {
    // manejar respuesta exitosa
    console.log(response);
  });
