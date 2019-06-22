import { Request, Response } from "express";
import { IncomingForm } from 'formidable';
const Busboy: any = require('busboy');
const multer: any = require('multer')



//Storage
var storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, 'uploads')
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

export const uploadFileMulter = multer({ dest: 'temp/' })


export const uploadFile = async (req: any, res: Response) => {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('finish', function () {
    console.log('Upload finished');
    // Your files are stored in req.files. In this case,
    // you only have one and it's req.files.element2:
    // This returns:
    // {
    //    element2: {
    //      data: ...contents of the file...,
    //      name: 'Example.jpg',
    //      encoding: '7bit',
    //      mimetype: 'image/png',
    //      truncated: false,
    //      size: 959480
    //    }
    // }
    // Grabs your file object from the request.
    const file = req.files.file;
    console.log(file);
    res.json(200)
  });
  req.pipe(busboy);
}
