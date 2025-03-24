import { HttpException } from '../exceptions/httpException';
import { Tape } from '../interfaces/tapes.interface';
import { TapeModel } from '../models/tapes.model';

export class TapeService {
  public async findAllTape(): Promise<Tape[]> {
    const tapes: Tape[] = TapeModel;
    return tapes;
  }

  public async findTapeByQrCode(qrcode: string): Promise<Tape> {
    const findTape: Tape | undefined = TapeModel.find(tape => tape.qrcode === qrcode);
    if (!findTape) throw new HttpException(409, `Tape with qrcode ${qrcode} not found`);

    return findTape;
  }

  public async createTape(tapeData: Tape): Promise<Tape> {
    const findTape: Tape | undefined = TapeModel.find(tape => tapeData.qrcode === tape.qrcode);
    if (findTape) throw new HttpException(409, `Tape with qrcode ${tapeData.qrcode} already exists`);

    const createTapeData: Tape = { ...tapeData, id: TapeModel.length + 1 };
    return createTapeData;
  }

  public async updateTape(qrcode: string, tapeData: Tape): Promise<Tape[]> {
    await this.findTapeByQrCode(qrcode);

    const updateTapeData: Tape[] = TapeModel.map((tape: Tape) => {
      if (tape.qrcode === tapeData.qrcode) tape = { ...tape, ...tapeData };
      return tape;
    });

    return updateTapeData;
  }

  public async deleteTape(qrcode: string): Promise<Tape[]> {
    await this.findTapeByQrCode(qrcode);
    const deleteTapeData: Tape[] = TapeModel.filter(tape => tape.qrcode !== qrcode);
    return deleteTapeData;
  }
}
