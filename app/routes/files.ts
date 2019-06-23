import { Request, Response } from "express";
import { uploadFile, getFiles, getFileById, updateFile, downloadFileRoute, deleteFile } from "../controllers/files";
export class FileRoutes {

  public routes(app: any, auth: Function): void {
    app.route('/file')
      .post(auth, (req: Request, res: Response) => {
        uploadFile(req, res)
      })
      .get(auth, (req: Request, res: Response) => {
        getFiles(res)
      })

    app.route('/file/:id').get(auth, (req: Request, res: Response) => {
      downloadFileRoute(req.params.id, res)
    }).patch(auth, (req: Request, res: Response) => {
      updateFile(req, res)
    }).delete(auth, (req: Request, res: Response) => {
      deleteFile(req.params.id, res)
    })
  }
}
