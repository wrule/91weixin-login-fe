
const webpack = require("webpack");

module.exports = {
    publicPath: "./",
    devServer: {
        open: true,
        proxy: {
            "/api/91wx": {
                target: "http://localhost:10241/",
                changeOrigin: true,
                secure: false,
            },
        },
    },
};
