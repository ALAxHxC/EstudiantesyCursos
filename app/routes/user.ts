import { Request, Response, response } from "express";
import { UserController } from "../controllers/user";
let contactController: UserController = new UserController();
export class Routes {

  public routes(app: any): void {
    // Contact 
    app.route('/user')
      // GET endpoint 
      .get((req: Request, res: Response) => {
        // Get all contacts            
        contactController.getAllContacts(req, res);
      })
      // POST endpoint
      .post((req: Request, res: Response) => {
        // Create new contact         
        contactController.addNewContact(req, res)
      })
    app.route('/user/recover/:email').get((req: Request, res: Response) => {
      contactController.recoverPassword(req.params.email, res);
    })

    // Contact detail
    app.route('/user/:contactId')
      // get specific contact
      .get((req: Request, res: Response) => {
        // Get a single contact detail            
        contactController.getByIdContact(req, res);
      })
      .put((req: Request, res: Response) => {
        // Update a contact           
        contactController.updateDocument(req, res)
      })
      .delete((req: Request, res: Response) => {
        // Delete a contact     
        contactController.deleteDocument(req, res);
      })
  }
}
