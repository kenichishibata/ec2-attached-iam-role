#!/bin/bash

which jq &> /dev/null

if [ $? -ne 0 ]; then
	echo -e "\e[31myou dont have jq in your system run ./install-jq.sh to install it 39m"
	exit 1;
fi

commandString="curl -s 169.254.169.254/latest/meta-data/iam/security-credentials/"
securityName=$($commandString)
iamString=$commandString$securityName
iam=$($iamString)
echo 'the iam role name is '$securityName;

export AKID=$(echo $iam | jq '.AccessKeyId' )
export SECRET=$(echo $iam | jq '.SecretAccessKey' )
