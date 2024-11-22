import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payments, PaymentsDocument } from './schemas/payments.schema';
import { Types } from 'mongoose';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payments.name) private paymentsModel: Model<PaymentsDocument>) {}

  async create(body: any) {
    try {
      let document = new this.paymentsModel(body);
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
      return await this.paymentsModel.aggregate([
        {
          $match: {
            _id: { $ne: null }
          }
        },
        { 
          $project: {
            _id: { $toString: "$_id" },
            wallet: { $toString: "$wallet" },
            client: { $toString: "$client" },
            amount: 1,
            startDate: 1,
            endDate: 1
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
      const document = await this.paymentsModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id)
          }
        },
        { 
          $project: {
            _id: { $toString: "$_id" },
            wallet: { $toString: "$wallet" },
            client: { $toString: "$client" },
            amount: 1,
            startDate: 1,
            endDate: 1
          }
        }
      ])
      
      if (!document.length) throw new NotFoundException(`payment with ID ${id} not found`);
      
      return document[0];
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async update(id: string, body: any) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException(`Invalid id ${id}`, 400);
      let document = await this.paymentsModel.findByIdAndUpdate(id, body, { fields: { __v: 0 } }).lean();
      if (!document) throw new NotFoundException(`payment with ID ${id} not found`);
      
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
      const document = await this.paymentsModel.deleteOne({ _id: id }).lean();
      if (document.deletedCount === 0) throw new NotFoundException(`payment with ID ${id} not found`);
  
      return document;
    } catch (error) {
      console.error(error);
      return error
    }
  }
}