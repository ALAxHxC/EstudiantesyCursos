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
  async getOne(data: Object) {
    try {
      let all = await this.EntityModel.findOne(data)
      return all;
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
      let newObject = await this.EntityModel.findOneAndUpdate(query, data, { new: true });
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