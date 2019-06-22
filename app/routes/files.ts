import { Request, Response } from "express";
import { uploadFile, uploadFileMulter } from "../controllers/files";
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
export class FileRoutes {

  public routes(app: any): void {
    app.route('/file')
      .post((req: Request, res: Response) => {
        uploadFile(req, res)
      })
  }
}
