import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from "@nestjs/common";
import { Observable, map } from "rxjs";


@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                const response = context.switchToHttp().getResponse();
                if (data && data.statusCode) {
                    response.status(data.statusCode);
                }
                /*   else {
                   response.status(HttpStatus.OK); // Default to 200 if statusCode not provided
                 } */
                return data;
            })
        );
    }
}