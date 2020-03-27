export declare class AppService {
    ping(): string;
    getHeaders(): {
        'Content-Type': string;
        Authorization: string;
    };
    getStatus(info: any, response: any): string;
}
