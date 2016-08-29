'use strict';
const http = require('http');

function getBody(params, securityName, callback){
  let body = '';
  const host = params.host;
  return http.get({
    host,
    path: `${params.path}/${securityName}`
  }, function(response){
    response.on('data',function(data){
      body += data;
    })
    response.on('end', function(){
      const output = JSON.parse(body);
      const SecretAccessKey = output.SecretAccessKey;
      const AccessKeyId = output.AccessKeyId;
      const Token = output.Token;
      if(SecretAccessKey && AccessKeyId && Token){
        callback(null,{
          SecretAccessKey,
          AccessKeyId,
          Token
        });
      }
      else {
        console.log(`SecretAccessKey: ${SecretAccessKey}
          AccessKeyId: ${AccessKeyId}
          Token: ${Token}`)
      }
    });
  }).on('error', function(err){
    console.log('Error with the request:'+ err.message + JSON.stringify(err));
    callback(err,null);
  })
}

function getSecurityName(params, callback){
  let body = '';
  const host = params.host;
  const path = params.path;
  return http.get({
    host,
    path
  }, function(response){
    response.on('data', function(data){
      body += data;
    })
    response.on('end', function(){
      const securityName = body
      if(securityName){
        callback(null,securityName);
      }
      else{
        callback('error',null);
      }
    });
  })

}

const params = {
  host: '169.254.169.254',
  path: '/latest/meta-data/iam/security-credentials/'
}

function IAM(callback){
  getSecurityName(params, function(err,res){
      if(err)
        callback(err,null);
      else{
        getBody(params, res, function(err, res){
          if(err)
            callback(err,null);
          else{
          callback(null,res);
          }
        });
      }
  });
}

module.exports = IAM;
