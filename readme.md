# Why?
[Full Justification](http://www.tonytruong.net/using-aws-temporary-security-credentials-on-ec2-with-node-js/)

Applications that run on an EC2 instance must include AWS credentials in their AWS API requests. You could have your developers store AWS credentials directly within the EC2 instance and allow applications in that instance to use those credentials. But developers would then have to manage the credentials and ensure that they securely pass the credentials to each instance and update each EC2 instance when it's time to rotate the credentials. That's a lot of additional work.

Instead, you can and should use an IAM role to manage temporary credentials for applications that run on an EC2 instance. When you use a role, you don't have to distribute long-term credentials to an EC2 instance. Instead, the role supplies temporary permissions that applications can use when they make calls to other AWS resources. When you launch an EC2 instance, you specify an IAM role to associate with the instance. Applications that run on the instance can then use the role-supplied temporary credentials to sign API requests.

# Use EC2 Attached IAM credentials
For ease of mind use attached EC2 Iam credentials (if it exists) instead of hardcoding it in your repo or environment variable.
This is the most secure way of using AWS resources from EC2. Since these IAM credentials is temporary and therefore more secure

# Preference
* Via export
* Via callback

# Example via export

```
ssh myEc2Instance
git clone myrepo.git
source ./exporting.sh
echo $AKID # should give you the ec2 AccessKeyId if attached iam role exists
echo $SECRET # should give you the ec2 SecretAccessKey if attached iam role exists
```

# Example via callback
inside ec2 instance
`node example/sample.js`
```
var IAM = require('../security');

IAM(function(err,res){
  console.log(res);
});
```
