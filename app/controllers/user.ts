import * as mongoose from 'mongoose';
import { User } from '../models/user';
import { Request, Response } from 'express';
import { Entity } from '../models/entity';
import { sendMessageForgetPassword } from './providers/sendgrid';

//const Contact = mongoose.model('Contact', ContactSchema);
let entity = new Entity(User);
export class UserController {
  private makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  public async recoverPassword(email: string, res: Response) {
    try {
      let user: any = await entity.getOne({ username: email });
      user.password = this.makeid(10);
      let mail = sendMessageForgetPassword(user);
      await entity.update({ _id: user._id }, { password: user.password });
      res.status(200).json({ user: user, mail: mail });
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  public async addNewContact(req: Request, res: Response) {
    try {
      let newContact = await entity.create(req.body);
      res.status(200).json(newContact);
    } catch (error) {
      console.log(error.stack)
      res.status(400).json({ error: error.message, stack: error.stack })
    }
  }
  public async getAllContacts(req: Request, res: Response) {
    try {
      let newContact = await entity.getAll();
      res.status(200).json(newContact);
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  public async getByIdContact(req: Request, res: Response) {
    try {
      let newContact = await entity.getById(req.params.contactId);
      res.status(200).json(newContact);
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  public async updateDocument(req: Request, res: Response) {
    try {
      let newContact = await entity.update({ '_id': req.params.contactId }, req.body);
      res.status(200).json(newContact);
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  public async deleteDocument(req: Request, res: Response) {
    try {
      let newContact = await entity.delete({ '_id': req.params.contactId });
      res.status(200).json(newContact);
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
