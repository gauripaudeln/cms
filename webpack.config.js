const path = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');

   module.exports = {
     entry: './src/index.tsx',
     resolve: {
       extensions: ['.ts', '.tsx', '.js'],
     },
     module: {
       rules: [
         {
           test: /\.(ts|tsx)$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
           },
         },
         {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        },
       ],
     },
     devServer: {
       contentBase: path.join(__dirname, 'dist'),
       historyApiFallback: true,
       host: 'localhost',
       compress: true,
       hot: true,
       port: 3000,
       publicPath: '/',
     },
     devtool: 'source-map',
     output: {
       filename: '[name].bundle.js',
       publicPath: '/',
       path: path.resolve(__dirname, 'dist'),
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: path.join(__dirname, 'index.html'),
       }),
     ],
   };