var aws = require("aws-sdk");
const keys = require("../config/keys");

aws.config.update({
  accessKeyId: keys.awsAccessKeyID,
  secretAccessKey: keys.awsSecretAccessKey,
  region: "us-east-2",
});

exports = module.exports = {
  sign: async function (filename, filetype) {
    var s3 = new aws.S3();
    var params = {
      Bucket: keys.s3BucketName,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
    };
    try {
      let url = await s3.getSignedUrlPromise("putObject", params);
      return url;
    } catch (err) {
      return err;
    }
  },
};
