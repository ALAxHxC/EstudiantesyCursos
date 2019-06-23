import { Request, Response } from "express";
import { ClientController } from "../controllers/client";
let contactController: ClientController = new ClientController();
export class ClientRoutes {

  public routes(app: any, auth: Function): void {

    app.route('/client')
      .get(auth, (req: Request, res: Response) => {
        contactController.getAllContacts(req, res);
      })
      .post(auth, (req: Request, res: Response) => {
        contactController.addNewContact(req, res)
      })

    app.route(auth, '/client/:contactId')
      .get((req: Request, res: Response) => {
        contactController.getByIdContact(req, res);
      })
      .put(auth, (req: Request, res: Response) => {
        contactController.updateDocument(req, res)
      })
      .delete(auth, (req: Request, res: Response) => {
        contactController.deleteDocument(req, res);
      })
  }
}
