import { Request, Response } from "express";
import { resolve } from "url";
import { rejects } from "assert";

import * as storage from '@google-cloud/storage';

const Busboy: any = require('busboy');
const fs: any = require('fs');
const path: any = require('path');
//AWS SHOWS bad credentials
const aws = require('aws-sdk');
const s3 = new aws.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
  Bucket: `gs://${process.env.BUCKET_NAME}`
});
let credentials = path.join(__dirname, '..', 'certs', process.env.CERT);
console.log(credentials)
//Firebase personal project
const storageGCP = new storage.Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: credentials
});
const bucket = storageGCP.bucket(String(process.env.GCS_BUCKET));

export const uploadFile = (req: any, res: Response) => {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('finish', function () {
    console.log('Upload finished');
    const file = req.files.file;
    uploadLocalFile(file).then(data => {
      uploadFirebaseFile(file.name, file.mimetype).then(data => {
        res.json(data)
      }).catch(error => {
        console.log(error)
        res.json(error)
      })
    }).catch(error => {
      console.log(error)
      res.json(error)
    })

  });
  req.pipe(busboy);
}
const uploadFirebaseFile = async (file: string, mime: string) => {
  let data = new Promise((resolve: Function, reject: Function) => {
    bucket.upload(`temp/${file}`, {
      destination: file,
      public: true,
      metadata: { contentType: mime, cacheControl: "public, max-age=300" }
    }, function (err, result_file) {
      if (err) {
        console.log(err);
        reject(err)
        return;
      }
      //console.log(result_file)
      result_file.makePublic().then(data => {
        console.log('data lo ahce publico', data)
        console.log('uploadfile', createPublicFileURL(result_file));
        resolve({ "url": createPublicFileURL(result_file), "id": result_file.id });

      }).catch(error => {
        reject(error)
      })

    });

  });
  return await data;
}
const createPublicFileURL = (new_file: any) => {
  const img_url = 'https://firebasestorage.googleapis.com/v0/b/' + process.env.GCS_BUCKET + '/o/'
    + encodeURIComponent(new_file.name)
    + '?alt=media&token='
    + new_file.metadata.firebaseStorageDownloadTokens;
  return img_url;
}
const uploadLocalFile = async (file: any) => {
  let data = new Promise((resolve: Function, reject: Function) => {
    fs.open(`temp/${file.name}`, 'w', function (err: any, fd: any) {
      if (err) {
        reject('could not open file: ' + err);
      }

      // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
      fs.write(fd, file.data, 0, file.data.length, null, function (err: any) {
        if (err) reject('could not open file: ' + err);
        fs.close(fd, function () {
          console.log('wrote the file successfully');
          resolve();
        });
      });
    });
  })
  return await data;
}
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