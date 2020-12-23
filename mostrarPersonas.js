var rp = require('request-promise');

var options = { 
  method: 'GET',
  uri: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
  json: true
};

rp(options)
    .then(function(resp){
      console.log(resp); 

    }).catch(function(err){
      console.log('error: ' + err);
    })