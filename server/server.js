const { default: axios } = require('axios');
var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors())

//check user
app.get('/repos/:username', (req, res) => {

   var owner = req.params.username;

   const curl=`https://api.github.com/users/${owner}`;

   axios.get(curl)
   .then((response)=> res.json(response.data))
   .catch((e)=> res.send(e))

})


//check repo
app.get('/repos/:username/:reponame', (req, res) => {

   var owner = req.params.username;
   var repo = req.params.reponame;

   const curl=`https://api.github.com/repos/${owner}/${repo}`;

   axios.get(curl)
   .then((response)=> res.json(response.data))
   .catch((e)=> res.send(e))

})


//get commits
app.get('/repos/:username/:reponame/commits/:sha', (req, res) => {

   var owner = req.params.username;
   var repo = req.params.reponame;
   var oid = req.params.sha;

   const curl=`https://api.github.com/repos/${owner}/${repo}/commits/${oid}`;//commit url

   axios.get(curl)
   .then((response)=> res.json(response.data))
   .catch((e)=> res.send(e))

})

//get diff
 app.get('/repos/:username/:reponame/commits/:parentsha/:sha/diff', (req, res)=>{
   
   var username = req.params.username;
   var repo = req.params.reponame;
   var psha = req.params.parentsha;
   var oid = req.params.sha;

   const durl=`https://api.github.com/repos/${username}/${repo}/compare/${psha}...${oid}`;//diff url
      
   axios.get(durl)
   .then((response)=> res.json(response.data))
   .catch((e)=> res.send(e))
   
})

app.listen(8081,()=>{
   console.log("Running successfully...")
});