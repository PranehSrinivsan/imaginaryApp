var express = require('express');
var app = express();

app.get('/api.github.com', function (req, res) {
   var XMLHttpRequest = require('xhr2');
   var xhr = require('http')
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

app.get('/api.github.com/repos/:owner/:reponame', function(req, res) {
   
   var XMLHttpRequest = require('xhr2');
   var xhr = new XMLHttpRequest();
   var username = req.params.owner;
   var repo = req.params.reponame;
  // console.log(username);
   //console.log(repo);
   const url=`https://api.github.com/repos/${username}/${repo}`;
   xhr.open('GET', url, true);
   xhr.onload = function () {
      const data = JSON.parse(this.response);
      res.send(data);
   }
   xhr.send();
})

app.get('/api.github.com/repos/:owner/:reponame/:commit/:sha', function(req, res) {
   
    var XMLHttpRequest = require('xhr2');
    var xhr = new XMLHttpRequest();
    var username = req.params.owner;
    var repo = req.params.reponame;
    var commitId = req.params.commit;
    var Sha = req.params.sha;
    const url=`https://api.github.com/repos/${username}/${repo}/${commitId}/${Sha}`;
    xhr.open('GET', url, true);
    xhr.onload = function () {
       const data = JSON.parse(this.response);
       res.send(data);
    }
    xhr.send();
 })
app.listen(8000);
