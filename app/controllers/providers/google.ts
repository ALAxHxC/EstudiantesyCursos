import * as storage from '@google-cloud/storage';
const path: any = require('path');
let credentials = path.join(__dirname, '..', '..', 'certs', process.env.CERT);
console.log(credentials)
//Firebase personal project
const storageGCP = new storage.Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: credentials
});
const bucket = storageGCP.bucket(String(process.env.GCS_BUCKET));
export const getAllFiles = async () => {
  let [files] = await bucket.getFiles();
  files = files.map(item => {
    return { id: item.name, url: createPublicFileURL(item) }
  })
  return files;
}
export const getOneFile = async (name: string) => {
  let file: Object = await bucket.file(name)
  file.url = createPublicFileURL(file);
  return file;
}
export const uploadFirebaseFile = async (file: string, mime: string) => {
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
export const createPublicFileURL = (new_file: any) => {
  const img_url = 'https://firebasestorage.googleapis.com/v0/b/' + process.env.GCS_BUCKET + '/o/'
    + encodeURIComponent(new_file.name)
    + '?alt=media&token='
    + new_file.metadata.firebaseStorageDownloadTokens;
  return img_url;
}