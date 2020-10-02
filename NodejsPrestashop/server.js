'use strict';
var path = require('path');
var express = require('express');
var request = require('request');
var parseString = require('xml2js').parseString;

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.get('/api/orders', function (req, res) {
    var options = {
        'method': 'GET',
        'url': 'http://18.219.54.186/api/orders/',
        'headers': {
            'Authorization': 'Basic M0JBVEUxMjVKSklYNE0zSTJOSlNUVkZDUzlUUzZHRDk6',
            'Cookie': 'PrestaShop-0ffc98a015b67482f8ca6d906509b40a=def502009e14233cf6be7262be1d1c27c6511f90ac2063e6fad026f707d02149b00689cf24d8578dec9ef163345313d9489b99c3eed30aa470b74bbc6be252d87f632cc67fe6df69e80200c61eb0c3c662cdfad8cc75367798873c6311932896fb6b5df5a54e6ab8d7b6677a7bbd0843258e2976b4d8f3b6797e9a6a86b042e3e7844eafcf117a611c2c3d9ab3b42c150bed6464c121a386403e6c923244481e9da5a994c36fff7139bb55dcd6c86361922e4073fc44379ad2dd29e5be8cf6a81c2657; PHPSESSID=d7ou236uhcmeh2ocfut1fsn3je'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        parseString(response.body, function (err, result) {
            res.json({
                orders: result.prestashop.orders
            })
        });

        //res.json({
        //    orders: response.body
        //   })
    });
});

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});