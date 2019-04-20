
const webpack = require("webpack");

module.exports = {
    devServer: {
        open: true,
        proxy: {
            "/api": {
                target: "http://www.91weixin.net:10241/",
                changeOrigin: true,
                secure: false,
            },
        },
    },
};
