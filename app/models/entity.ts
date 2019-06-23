import mongoose from "mongoose";

export class Entity {
  private EntityModel: mongoose.Model<mongoose.Document, {}>;
  constructor(EntityModel: mongoose.Model<mongoose.Document, {}>) {
    this.EntityModel = EntityModel;
    //console.log(this.EntityModel)
  }
  async getById(id: String) {
    try {
      let all = await this.EntityModel.findById(id)
      return all;
    } catch (error) {
      throw (error)
    }
  }
  async getAll() {
    try {
      let all = await this.EntityModel.find({})
      return all;
    } catch (error) {
      throw (error)
    }
  }
  async getOne(data: any) {
    try {
      let all = await this.EntityModel.find(data).limit(1)
      return all[0];
    } catch (error) {
      throw (error)
    }
  }
  async getMany(data: Object) {
    try {
      let all = await this.EntityModel.find(data)
      return all;
    } catch (error) {
      throw (error)
    }
  }
  async cleanCreate(query: Object, data: Object) {
    try {
      await this.EntityModel.remove(query);
      return await this.create(data);
    } catch (error) {
      throw (error)
    }
  }
  async create(data: Object) {
    try {
      let newObject = await this.EntityModel.create(data);
      return newObject;
    } catch (error) {
      throw (error)
    }
  }
  async update(query: Object, data: Object) {
    try {
      console.log(query, data)
      let newObject = await this.EntityModel.updateOne(query, data);
      return newObject;
    } catch (error) {
      throw (error)
    }
  }
  async delete(data: Object) {
    try {
      let newObject = await this.EntityModel.remove(data);
      return newObject;
    } catch (error) {
      throw (error)
    }
  }
}