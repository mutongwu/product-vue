
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const webpack = require('webpack');
const config = require('./dev.js')();
const compiler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

// app.use(webpackHotMiddleware(compiler))

// app.use('/DiagnosisPlatform', express.static(path.join(__dirname, '../../dist/DiagnosisPlatform')))
app.get('/DiagnosisPlatform', (req, res) => {
  res.sendFile(path.join(`${__dirname}../template.html`));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
