import { Request, Response } from "express";
import { ClientController } from "../controllers/client";
//let contactController: ClientController = new ClientController();
import { filmentReserve } from "../controllers/dialogflow";
export class DialogRoutes {

  constructor(app: any) {
    app.route('/webhook')
      .post((req: Request, res: Response) => {
        filmentReserve(req, res)
      })
  }
}
