import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Clients, ClientsDocument } from './schemas/clients.schema';
import { Types } from 'mongoose';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Clients.name) private clientsModel: Model<ClientsDocument>) {}

  async create(body: any) {
    try {
      let document = new this.clientsModel(body);
      document = await document.save();
      document = await this.findOne(document._id);
      
      return document;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findAll() {
    try {
      return await this.clientsModel.aggregate([
        {
          $match: {
            _id: { $ne: null }
          }
        },
        { 
          $project: {
            _id: { $toString: "$_id" },
            name: 1,
            email: 1,
            phone: 1
          }
        }
      ]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findOne(id: any) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException(`Invalid id ${id}`, 400);
      const document = await this.clientsModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id)
          }
        },
        { 
          $project: {
            _id: { $toString: "$_id" },
            name: 1,
            email: 1,
            phone: 1
          }
        }
      ])
      
      if (!document.length) throw new NotFoundException(`client with ID ${id} not found`);
      
      return document[0];
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async update(id: string, body: any) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException(`Invalid id ${id}`, 400);
      let document = await this.clientsModel.findByIdAndUpdate(id, body, { fields: { __v: 0 } }).lean();
      if (!document) throw new NotFoundException(`client with ID ${id} not found`);

      document = await this.findOne(id);

      return document;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException(`Invalid id ${id}`, 400);
      const document = await this.clientsModel.deleteOne({ _id: id }).lean();
      if (document.deletedCount === 0) throw new NotFoundException(`client with ID ${id} not found`);
  
      return document;
    } catch (error) {
      console.error(error);
      return error
    }
  }
}
