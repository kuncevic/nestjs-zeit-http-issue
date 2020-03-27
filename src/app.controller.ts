import { Controller, Get, Post, Logger, Param, Body, Req, Request, HttpService, HttpException, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { catchError, tap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private httpService: HttpService) {}

  @Get()
  default(): string {
    return this.appService.ping();
  }

  @Put('test')
  test(@Body() data: any): string {
    Logger.log('test success');
    Logger.log(data);

    return 'test success'
  }

  // I had this code initially that throws an error on zeit v2 but the code successfully did work on v1
  @Post('subscribe')
  subscribe(@Body() data: any, @Req() request: Request): void {
    Logger.log(data); // this works in v2

    // the rest does not work in v2
    this.httpService.put('https://webhook.site/03ec0f5c-603e-4fcd-b5d7-e2281d22a324',
      data,
      { headers: this.appService.getHeaders() }
    ).pipe(
      catchError(e => {
        Logger.log(this.appService.getStatus('[POST] /subscribe, error', e.response));
        Logger.log(e);
        throw new HttpException(e.response.statusText, e.response.status);
      })).subscribe((x) => {
        Logger.log(this.appService.getStatus('[POST] /subscribe, success', x));
    })
  }

  // For better debugging purposes I did refactor the code of the function above by removing the '.subscribe()' and returning the result 'Observable<"error" | "success">' from the api
  // Surprisingly the new code does work win no errors on v2, however I wonder why the original code (the error function) didn't work on zeit v2
  @Post('map')
  map(@Body() data: any, @Req() request: Request): Observable<"error" | "success"> {
    Logger.log(data);

    return this.httpService.put('https://webhook.site/03ec0f5c-603e-4fcd-b5d7-e2281d22a324',
      data,
      { headers: this.appService.getHeaders() }
    ).pipe(
      catchError(e => {
        Logger.log(this.appService.getStatus('[POST] /map, error', e.response));
        Logger.log(e);
        return of('error')
      }),
      map((x) => {
        if(x !== 'error'){
          Logger.log(this.appService.getStatus('[POST] /map, success', x));
          return 'success';
        } else {
          Logger.log(x);
          return 'error';
        }
    }))
  }
}
