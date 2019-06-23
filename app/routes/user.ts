import { Request, Response, response } from "express";
import { UserController } from "../controllers/user";
let usersController: UserController = new UserController();
export class Routes {

  public routes(app: any, auth: Function): void {
    app.route('/user')
      .get(auth, (req: Request, res: Response) => {
        usersController.getAllContacts(req, res);
      })
      .post((req: Request, res: Response) => {
        usersController.addNewContact(req, res)
      })
    app.route('/user/recover/:email').get((req: Request, res: Response) => {
      usersController.recoverPassword(req.params.email, res);
    })

    app.route(auth, '/user/:contactId')
      .get((req: Request, res: Response) => {
        usersController.getByIdContact(req, res);
      })
      .put(auth, (req: Request, res: Response) => {
        usersController.updateDocument(req, res)
      })
      .delete(auth, (req: Request, res: Response) => {
        usersController.deleteDocument(req, res);
      })
  }
}
