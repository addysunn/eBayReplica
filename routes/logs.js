'use strict';
var winston = require('winston');
var fs = require('fs');

var logged_data = new (winston.Logger)({
    transports: [
      new (winston.transports.File)( { filename: '././log/myLogs.log', level: 'info', timestamp:false})
    ]
  });

exports.logged_data = logged_data;