import { NextFunction, Request, Response } from 'express';
export const checkAccess =
  () => (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    //if(req.)
  };
