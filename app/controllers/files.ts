import { Request, Response } from "express";
import { uploadFirebaseFile, createPublicFileURL } from "./providers/google";
import { uploadLocalFile, deleteLocal } from './providers/utils';
const Busboy: any = require('busboy');
export const uploadFile = (req: any, res: Response) => {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('finish', function () {
    console.log('Upload finished');
    const file = req.files.file;
    uploadLocalFile(file).then(data => {
      uploadFirebaseFile(file.name, file.mimetype).then(data => {
        deleteLocal(file.name)
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
export const getFiles = (res: Response) => { }
export const getFileById = (id: string, res: Response) => { }
export const updateFile = (id: string, res: Response) => { }
export const deleteFile = (id: string, res: Response) => { }

