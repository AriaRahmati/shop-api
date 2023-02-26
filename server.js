require('module-alias')(__dirname);
require('dotenv').config();
require('express-async-errors')

global.config = require('@configs');

const App = require('@root/src');
new App();