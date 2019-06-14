import { Request, Response } from "express";
import { ContactController } from "../controllers/crm";
let contactController: ContactController = new ContactController();
export class Routes {

  public routes(app: any): void {
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      })

    // Contact 
    app.route('/contact')
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

    // Contact detail
    app.route('/contact/:contactId')
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
