import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";



export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest();

        let user = req.user;

        if(!user){
            throw new InternalServerErrorException('User not found request');
        }

        return (!data)? user : user[data];

    }
)