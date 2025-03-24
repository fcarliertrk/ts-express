import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/httpException';
import { Tape } from '../interfaces/tapes.interface';
import { TapeService } from '../services/tapes.service';

export class TapeController {
  public tape = new TapeService();

  public getTapeByQrCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const qrcode: string | undefined = req.params.qrcode;
      if(!qrcode) {
        throw new HttpException(400, `No qrcode sent in URL params`);
      };
      const tapeData: Tape | undefined = await this.tape.findTapeByQrCode(qrcode);
      res.status(200).json({ data: tapeData, message: 'getTapeByQrCode' });
    } catch (error) {
      next(error);
    }
  };

  public createTape = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tapeData: Tape = req.body;
      const createdTapeData: Tape = await this.tape.createTape(tapeData);

      res.status(201).json({ data: createdTapeData, message: `Created tape with qrcode ${createdTapeData.qrcode}` });
    } catch (error) {
      next(error);
    }
  };

  public updateTape = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const qrcode = req.params.qrcode;
      if(!qrcode) {
        throw new HttpException(400, `No qrcode sent in URL params`);
      };
      const tapeData: Tape = req.body;
      const updateTapeData: Tape[] = await this.tape.updateTape(qrcode, tapeData);

      res.status(200).json({ data: updateTapeData, message: `Updated tape with qrcode ${qrcode}` });
    } catch (error) {
      next(error);
    }
  };

  public deleteTape = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const qrcode = req.params.qrcode;
      if(!qrcode) {
        throw new HttpException(400, `No qrcode sent in URL params`);
      };
      const deletedTapeData: Tape[] = await this.tape.deleteTape(qrcode);

      res.status(200).json({ data: deletedTapeData, message: `Deleted tape with qrcode ${qrcode}` });
    } catch (error) {
      next(error);
    }
  };
}
