import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class ProcessPaginateMiddleware implements NestMiddleware {

  use(req: any, res: any, next: () => void) {

    if (req.query.pg != null && req.query.pg != '') {
      req.page = req.query.pg;
    } else {
      req.page = 1;
    }

    next();
  }

}

