import * as mongoose from 'mongoose';
import { Client } from '../models/client';
import { Request, Response } from 'express';
import { Entity } from '../models/entity';

//const Contact = mongoose.model('Contact', ContactSchema);
let entity = new Entity(Client);
export class ClientController {
  public async addNewContact(req: Request, res: Response) {
    console.log('recibedata')
    try {
      let newContact = await entity.create(req.body);
      res.status(200).json(newContact);
    } catch (error) {
      res.status(400).json({ error: error.message })
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
