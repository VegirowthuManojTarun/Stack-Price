// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const path = require("path")
const axios = require("axios")
const cors = require("cors")


// cors("https://api.wazirx.com/")

app.use(express.static(path.join(__dirname,"/build")))

// app.use('/api', createProxyMiddleware({ 
//   target: 'https://api.wazirx.com',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/api': '', // remove /api from the start of the request URL
//   },
// }));

app.get("/api/v2/tickers",async (req,res)=>{
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = response.data;

    res.status(200).json(tickers);

  } catch (error) {
    console.error('Error fetching data from WazirX API:', error.message);
  }
})

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"/build/index.html"));
})

app.listen(3001);
console.log('Proxy server is running on http://localhost:3001');
