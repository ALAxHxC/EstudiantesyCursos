//AWS SHOWS bad credentials
const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
  Bucket: process.env.BUCKET_NAME
});

const uploadAws = async (file: any) => {
  let params = {
    Bucket: process.env.BUCKET_NAME,
    Key: file.name,
    Body: file.data,
    ACL: 'public-read'
  };
  let response = new Promise((resolve: Function, reject: Function) => {
    s3.upload(params, function (err: any, data: any) {
      if (err) {
        console.log('error in callback');
        console.log(err);
        reject(err)
      }
      console.log(data, { url: `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${file.name}` })
      resolve(data)
    });
  });
  return await response;
}