import { Injectable } from '@nestjs/common';
import { format } from 'date-fns'

@Injectable()
export class AppService {
  ping(): string {
    return "hello";
  }

  getHeaders() {
    const headersRequest = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer xyz",
    };

    return headersRequest;
  }

  getStatus(info, response) {
    if(response) {
      return ` ${info}: ${response.status} | ${response.statusText} `
    } else {
      return ` ${info}: undefined`;
    }
  }
}
