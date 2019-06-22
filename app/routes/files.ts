import { Request, Response } from "express";
import { uploadFile, getFiles, getFileById, updateFile, downloadFileRoute, deleteFile } from "../controllers/files";
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
      downloadFileRoute(req.params.id, res)
    }).patch((req: Request, res: Response) => {
      updateFile(req, res)
    }).delete((req: Request, res: Response) => {
      deleteFile(req.params.id, res)
    })
  }
}
