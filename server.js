var express = require('express');
var app = express();

//get commits
app.get('/repos/:username/:reponame/commits/:sha', function(req, res) {

   var XMLHttpRequest = require('xhr2');
   var xhr = new XMLHttpRequest();
   var owner = req.params.username;
   var repo = req.params.reponame;
   var oid = req.params.sha;

   const curl=`https://api.github.com/repos/${owner}/${repo}/commits/${oid}`;

   xhr.open('GET', curl, true);

   xhr.onload = function () {
      res.send(this.response);
   }
   xhr.send();

})

//get diff
 app.get('/repos/:username/:reponame/commits/:sha/diff', function(req, res) {
   
   var XMLHttpRequest = require('xhr2');
   var xhr = new XMLHttpRequest();
   var username = req.params.username;
   var repo = req.params.reponame;
   var oid = req.params.sha;

   const curl=`https://api.github.com/repos/${username}/${repo}/commits/${oid}`;

   xhr.open('GET', curl, true);

   xhr.onload = function () {

      const data = JSON.parse(this.response);
      var dxhr = new XMLHttpRequest();
      var psha = data.parents[0].sha;//parent sha
      
      const durl=`https://github.com/${username}/${repo}/compare/${psha}...${oid}.diff`;
      dxhr.open('GET', durl, true);

      dxhr.onload = function () {
         res.send(this.response);
      }
      dxhr.send();
   }
   xhr.send();

})

app.listen(8081);