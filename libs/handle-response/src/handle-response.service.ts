import { CustomError } from '@app/custom-error';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HandleResponseService {
  static getExampleResponseFormat(status: number) {
    if (status >= 400) {
      return {
        success: false,
        message: 'Corresponding error message.',
        statusCode: status,
        content: null,
      };
    }

    return {
      success: true,
      message: 'Success!',
      statusCode: status,
      content: {},
    };
  }

  buildResponse(data: any): {
    success: boolean;
    message: string;
    statusCode: number;
    content: any | null;
  } {
    if (data instanceof Error || data instanceof CustomError) {
      const statusCode = this.getStatusCode(data);
      const errorMessage = this.getErrorMessage(data);
      const errorContent = this.getErrorContent(data);
      
      return {
        success: false,
        message: errorMessage,
        statusCode,
        content: errorContent,
      };
    }

    return {
      success: true,
      message: 'success!',
      statusCode: HttpStatus.OK,
      content: data,
    };
  }

  private getErrorContent(error: any) {
    if ('isAxiosError' in error && (error as any).isAxiosError) return error.response.data;
    return null;
  }

  private getErrorMessage(error: any) {
    if (error.message) return error.message;
    return 'An error occurred';
  }

  private getStatusCode(error: Error): number {
    if ('isAxiosError' in error && (error as any).isAxiosError) {
      const axiosError = error as any;
      if (axiosError.response && axiosError.response.status) {
        return axiosError.response.status;
      }
      return HttpStatus.BAD_GATEWAY;
    }

    if ('status' in error) {
      return (error as any).status;
    }
    
    switch (error.name) {
      case 'CustomError':
        return HttpStatus.BAD_REQUEST;
      case 'ValidationError':
        return HttpStatus.BAD_REQUEST;
      case 'UnauthorizedError':
        return HttpStatus.UNAUTHORIZED;
      case 'ForbiddenError':
        return HttpStatus.FORBIDDEN;
      case 'NotFoundError':
        return HttpStatus.NOT_FOUND;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}