import { Request, Response } from "express";
import { uploadFirebaseFile, createPublicFileURL, getAllFiles, getOneFile } from "./providers/google";
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
        res.status(201).json(data)
      }).catch(error => {
        console.log(error)
        res.status(400).json(error)
      })
    }).catch(error => {
      console.log(error)
      res.status(400).json(error)
    })

  });
  req.pipe(busboy);
}
export const getFiles = async (res: Response) => {
  try {
    let files = await getAllFiles();
    res.status(200).json(files)
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }

}
export const getFileById = async (id: string, res: Response) => {
  try {
    let file = await getOneFile(id);
    res.status(200).json(file)
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }


}
export const updateFile = (id: string, res: Response) => { }
export const deleteFile = (id: string, res: Response) => { }

