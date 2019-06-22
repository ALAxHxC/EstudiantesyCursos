import { Request, Response } from "express";
import { uploadFile, getFiles, getFileById } from "../controllers/files";
export class FileRoutes {

  public routes(app: any): void {
    app.route('/file')
      .post((req: Request, res: Response) => {
        uploadFile(req, res)
      })
      .get((req: Request, res: Response) => {
        getFiles(res)
      })

    app.route('/file/:id').get((req: Request, res: Response) => {
      getFileById(req.params.id, res)
    })
  }
}
