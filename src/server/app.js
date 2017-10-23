import app from './configs/server_config';
import connection from './configs/const';
var express = require('express');

var server = app.listen(connection.portServer, () => {
    console.log(`Server is running on port: ${connection.portServer}`);
});
