import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallets, WalletsDocument } from './schemas/wallets.schema';
import { Types } from 'mongoose';
import { ParseObjService } from '@app/parse-obj';
import { CustomError } from '@app/custom-error';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallets.name) private walletsModel: Model<WalletsDocument>,
    private parseObjService: ParseObjService
  ) {}

  async create(body: any) {
    try {
      body = this.parseObjService.parse(body);
      let document = new this.walletsModel(body);
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
      return await this.walletsModel.aggregate([
        {
          $match: {
            _id: { $ne: null }
          }
        },
        { 
          $project: {
            _id: { $toString: "$_id" },
            client: { $toString: "$client" },
            amount: 1
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
      if (!Types.ObjectId.isValid(id)) throw new CustomError(`Invalid id ${id}`, HttpStatus.BAD_REQUEST);
      const document = await this.walletsModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id)
          }
        },
        { 
          $project: {
            _id: { $toString: "$_id" },
            client: { $toString: "$client" },
            amount: 1
          }
        }
      ])
      
      if (!document.length) throw new NotFoundException(`wallet with ID ${id} not found`);
      
      return document[0];
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async update(id: string, body: any) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new CustomError(`Invalid id ${id}`, HttpStatus.BAD_REQUEST);
      let document = await this.walletsModel.findByIdAndUpdate(id, body, { fields: { __v: 0 } }).lean();
      if (!document) throw new NotFoundException(`wallet with ID ${id} not found`);
      
      document = await this.findOne(id);
      
      return document;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new CustomError(`Invalid id ${id}`, HttpStatus.BAD_REQUEST);
      const document = await this.walletsModel.deleteOne({ _id: id }).lean();
      if (document.deletedCount === 0) throw new NotFoundException(`wallet with ID ${id} not found`);
  
      return document;
    } catch (error) {
      console.error(error);
      return error
    }
  }
}