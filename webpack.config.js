const path = require('path')

module.exports = {
  entry: './src/index.js', // Входной файл
  output: {
    filename: 'bundle.js', // Имя собранного файла
    path: path.resolve(__dirname, 'dist'), // Путь к выходной директории
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Регулярное выражение для совпадения с файлами .js
        exclude: /node_modules/, // Исключить папку node_modules
        use: {
          loader: 'babel-loader', // Используем Babel для транспиляции
        },
      },
      { test: /\\.(png|jp(e*)g|svg|gif)$/, use: ['file-loader'] },

      {
        test: /\.css$/, // Регулярное выражение для совпадения с файлами .css
        use: ['style-loader', 'css-loader'], // Используем style-loader и css-loader
      },
    ],
  },
}
