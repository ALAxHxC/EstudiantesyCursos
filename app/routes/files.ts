import { Request, Response } from "express";
import { uploadFile } from "../controllers/files";
export class FileRoutes {

  public routes(app: any): void {
    app.route('/file')
      .post((req: Request, res: Response) => {
        uploadFile(req, res)
      })
  }
}
