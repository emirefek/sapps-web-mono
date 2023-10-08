const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/main.ts",
  target: "node",
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.cjs",
    path: path.resolve(__dirname, "dist"),
  },
};
