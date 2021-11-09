const { default: axios } = require('axios');
var express = require('express');
var app = express();

//get commits
app.get('/repos/:username/:reponame/commits/:sha', function(req, res) {
   var owner = req.params.username;
   var repo = req.params.reponame;
   var oid = req.params.sha;

   const curl=`https://api.github.com/repos/${owner}/${repo}/commits/${oid}`;//commit url

   axios.get(curl)
   .then((response)=>{
      res.json(response.data);
   })
   .catch((e)=>{
      res.send("Error")
   })

})

//get diff
 app.get('/repos/:username/:reponame/commits/:sha/diff', function(req, res) {
   
   var username = req.params.username;
   var repo = req.params.reponame;
   var oid = req.params.sha;

   const curl=`https://api.github.com/repos/${username}/${repo}/commits/${oid}`;//commit url

   axios.get(curl)
   .then((response)=>{

      var psha = response.data.parents[0].sha;//parent sha
      
      const durl=`https://github.com/${username}/${repo}/compare/${psha}...${oid}.diff`;//diff url
      
      axios.get(durl)
      .then((response)=> {
         res.json(response.data);
      })
      .catch((e)=>{
         res.send("Error")
      })
   })
   .catch((e)=>{
      res.send("Error")
   })
})

app.listen(8081);