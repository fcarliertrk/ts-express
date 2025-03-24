import { Router } from 'express';
import { TapeController } from '../controllers/tapes.controller';
// import { CreateTapeDto, UpdateTapeDto } from '@dtos/tapes.dto';
import { Routes } from '../interfaces/routes.interface';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class TapeRoute implements Routes {
  public path = '/tapes';
  public router = Router();
  public tape = new TapeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:qrcode(\\w+)`, this.tape.getTapeByQrCode);
    // this.router.post(`${this.path}`, ValidationMiddleware(CreateTapeDto), this.tape.createTape);
    // this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateTapeDto), this.tape.updateTape);
    this.router.delete(`${this.path}/:qrcode(\\w+)`, this.tape.deleteTape);
  }
}
