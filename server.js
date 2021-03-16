require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const Routes = require("./app/routes");

const { createProxyMiddleware } = require('http-proxy-middleware');

app.use([
    cors(),
    Routes
]);

app.use('/api', createProxyMiddleware({ 
    target: 'https://api.fast.com/netflix/speedtest/v2?https=true&token=YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm&urlCount=5', //original url
    changeOrigin: true, 
    // secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})