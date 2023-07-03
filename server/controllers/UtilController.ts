import { Request, Response } from 'express';

class UtilController {
  async ping(req: Request, res: Response) {
    return res.status(200).end();
  }
}

export default new UtilController();
