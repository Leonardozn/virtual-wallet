import { Injectable } from '@nestjs/common';
import { error } from 'console';

export enum ResponseType {
  CREATED = 'created',
  SUCCESS = 'success',
  ERROR = 'error',
}

@Injectable()
export class HandleResponseService {
  buildResponse(obj: any, type: ResponseType) {
    if (type === ResponseType.CREATED) {
      return {
        message: 'Success!',
        response: obj,
        statusCode: 201
      }
    }

    if (type === ResponseType.SUCCESS) {
      return {
        message: 'Success!',
        response: obj,
        statusCode: 200
      }
    }

    if (type === ResponseType.ERROR) {
      if (obj.response) {
        console.error(obj.response);

        if (obj.response.status < 500) {
          return {
            message: obj.response.data,
            error: "Internal server error.",
            statusCode: obj.response.status
          }
        }

        return {
          message: obj.response.data,
          error: "Bad Request",
          statusCode: obj.response.status
        }
      } else if (obj.request) {
        console.error(obj.request);

        return {
          message: obj.request,
          error: "Internal server error.",
          statusCode: 500
        }
      } else {
        console.error(obj);

        return {
          message: obj.message,
          error: obj,
          statusCode: 500
        }
      }
    }
  }
}
