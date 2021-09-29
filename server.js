var express = require('express');
var app = express();

app.get('/api.github.com', function (req, res) {
   var XMLHttpRequest = require('xhr2');
   var xhr = new XMLHttpRequest();
   const url=`https://api.github.com`;
   xhr.open('GET', url, true);
   xhr.onload = function () {
      const dat = JSON.parse(this.response);
      res.send(dat);
   }
   xhr.send();
})

app.get('/api.github.com/repos', function (req, res) {
   var XMLHttpRequest = require('xhr2');
   var xhr = new XMLHttpRequest();
   const url=`https://api.github.com/repos`;
   xhr.open('GET', url, true);
   xhr.onload = function () {
      const dta = JSON.parse(this.response);
      res.send(dta);
   }
   xhr.send();
})

app.get('/api.github.com/repos/owner', function(req, res) {
   
   var XMLHttpRequest = require('xhr2');
   var xhr = new XMLHttpRequest();
   const url=`https://api.github.com/repos/arunnatarajs/toDoApp`;
   xhr.open('GET', url, true);
   xhr.onload = function () {
      const data = JSON.parse(this.response);
      res.send(data);
   }
   xhr.send();
})

app.get('/api.github.com/repos/owner/commits', function (req, res) {
   var XMLHttpRequest = require('xhr2');
   var xhr = new XMLHttpRequest();
   const url=`https://api.github.com/repos/arunnatarajs/toDoApp/commits`;
   xhr.open('GET', url, true);
   xhr.onload = function () {
      const cdata = JSON.parse(this.response);
      res.send(cdata);
   }
   xhr.send();
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})