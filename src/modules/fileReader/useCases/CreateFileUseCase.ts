import { inject, injectable } from "tsyringe";
import { ICreateFilesDTO } from "../dtos/ICreateFilesDTO";
import { IFilesRepository } from "../repositories/IFilesRepository";
import { Readable } from "stream";
import readLine from "readline";

@injectable()
class CreateFileUseCase {
  constructor(
    @inject("FileRepository")
    private fileRepository: IFilesRepository
  ) {}

  async execute({id, matricula, nome, dataCobranca, valor}: ICreateFilesDTO) {
    await this.fileRepository.create({id, matricula, nome, dataCobranca, valor});
  }

  async processCSVFile(file) {
    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const bookFile = readLine.createInterface({
      input: readableFile,
    });

    for await (let line of bookFile) {
      const bookLineSplit = line.split(";");
      await this.fileRepository.create({
        id: bookLineSplit[0],
        matricula: bookLineSplit[1],
        nome: bookLineSplit[2],
        dataCobranca: bookLineSplit[3],
        valor: Number(bookLineSplit[4]),
      });
    }
    console.log(bookFile)
  }
}

export { CreateFileUseCase };
