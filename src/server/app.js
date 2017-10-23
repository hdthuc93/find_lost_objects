import app from './configs/dependencies';
import connection from './configs/connection';
var express = require('express');

var server = app.listen(connection.port, () => {
    console.log(`Server is running on port: ${connection.port}`);
});
