const { default: axios } = require("axios");

const HttpClient = axios.create({
    baseURL : 'https://64e6c5dab0fd9648b78edfba.mockapi.io',
    headers: {
        "Content-Type": "application/json",
      },
})
export default HttpClient