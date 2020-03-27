import { HttpService } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
export declare class AppController {
    private readonly appService;
    private httpService;
    constructor(appService: AppService, httpService: HttpService);
    default(): string;
    test(data: any): string;
    subscribe(data: any, request: Request): void;
    map(data: any, request: Request): Observable<"error" | "success">;
}
