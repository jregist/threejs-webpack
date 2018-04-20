const path = require("path");
var webpack = require("webpack");
var package = require("./package.json");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const middleware = require("webpack-dev-middleware");

module.exports = {
  entry: {
    app: "./src/js/app.js",
    //vendor: Object.keys(package.dependencies),
    //settings: "./src/scripts/settings.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist/")
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: "Threejs Demo",
      myPageHeader: "Threejs Demo Using Webpack",
      template: "./src/index.html",
      chunks: ["vendor", "app"],
      filename: "index.html" //relative to root of the application
    }),
   /*  new HtmlWebpackPlugin({
      hash: true,
      title: "My Awesome application",
      myPageHeader: "Settings",
      template: "./src/index.html",
      chunks: ["vendor", "shared", "settings"],
      filename: "settings.html" //relative to root of the application
    }), */
    //new CopyWebpackPlugin([{ from: "src/images", to: "images" }]),
    new ExtractTextPlugin({ filename: "css/app.bundle.css" })
  ]
};
