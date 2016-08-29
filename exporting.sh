#!/bin/bash
curl http://stedolan.github.io/jq/download/linux64/jq -o ./jq
chmox a+x ./jq

commandString="curl -s 169.254.169.254/latest/meta-data/iam/security-credentials/"
securityName=$($commandString)
iamString=$commandString$securityName
iam=$($iamString)
echo 'the iam role name is '$securityName;

export AKID=$(echo $iam | ./jq '.AccessKeyId' )
export SECRET=$(echo $iam | ./jq '.SecretAccessKey' )
