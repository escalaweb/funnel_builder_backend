import { createParamDecorator, ExecutionContext } from "@nestjs/common";



export const rawHeaders = createParamDecorator(
    (data, ctx: ExecutionContext) => {

        let raw = ctx.switchToHttp().getRequest();

        raw = raw.rawHeaders;

        return raw;
    }
)