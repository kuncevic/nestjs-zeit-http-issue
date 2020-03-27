"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let AppController = class AppController {
    constructor(appService, httpService) {
        this.appService = appService;
        this.httpService = httpService;
    }
    default() {
        return this.appService.ping();
    }
    test(data) {
        common_1.Logger.log('test success');
        common_1.Logger.log(data);
        return 'test success';
    }
    subscribe(data, request) {
        common_1.Logger.log(data);
        this.httpService.put('https://webhook.site/03ec0f5c-603e-4fcd-b5d7-e2281d22a324', data, { headers: this.appService.getHeaders() }).pipe(operators_1.catchError(e => {
            common_1.Logger.log(this.appService.getStatus('[POST] /subscribe, error', e.response));
            common_1.Logger.log(e);
            throw new common_1.HttpException(e.response.statusText, e.response.status);
        })).subscribe((x) => {
            common_1.Logger.log(this.appService.getStatus('[POST] /subscribe, success', x));
        });
    }
    map(data, request) {
        common_1.Logger.log(data);
        return this.httpService.put('https://webhook.site/03ec0f5c-603e-4fcd-b5d7-e2281d22a324', data, { headers: this.appService.getHeaders() }).pipe(operators_1.catchError(e => {
            common_1.Logger.log(this.appService.getStatus('[POST] /map, error', e.response));
            common_1.Logger.log(e);
            return rxjs_1.of('error');
        }), operators_1.map((x) => {
            if (x !== 'error') {
                common_1.Logger.log(this.appService.getStatus('[POST] /map, success', x));
                return 'success';
            }
            else {
                common_1.Logger.log(x);
                return 'error';
            }
        }));
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "default", null);
__decorate([
    common_1.Put('test'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "test", null);
__decorate([
    common_1.Post('subscribe'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "subscribe", null);
__decorate([
    common_1.Post('map'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AppController.prototype, "map", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService, common_1.HttpService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map