const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "src/js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src"),
          to: path.join(__dirname, "dist/src/"),
        },
        {
          from: path.join(__dirname, "images"),
          to: path.join(__dirname, "dist/images/"),
        },
        {
          from: path.join(__dirname, "manifest.json"),
          to: path.join(__dirname, "dist/manifest.json"),
        },
        {
          from: path.join(__dirname, "background.js"),
          to: path.join(__dirname, "dist/background.js"),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json", ".org"],
  },
};
