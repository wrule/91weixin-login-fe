
const webpack = require("webpack");

module.exports = {
    devServer: {
        open: true,
        proxy: {
            "/api": {
                target: "http://localhost:10241/",
                changeOrigin: true,
                secure: false,
            },
        },
    },
};
